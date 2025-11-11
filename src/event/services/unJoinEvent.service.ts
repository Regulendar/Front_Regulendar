import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { UnJoinEventInputDto, UnJoinEventOutputDto } from '../dto';

@Injectable()
export class UnJoinEventService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({
    eventId,
    userId,
  }: UnJoinEventInputDto): Promise<UnJoinEventOutputDto> {
    try {
      await this.prismaService.$transaction(async (tx) => {
        const user = await tx.user.findUnique({
          where: { id: userId },
          select: { eventIds: true },
        });
        if (!user) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        const event = await tx.event.findUnique({
          where: { eventId },
          select: { participationIds: true },
        });
        if (!event) {
          throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
        }

        const isUserParticipating = event.participationIds.includes(userId);
        if (!isUserParticipating) {
          throw new HttpException(
            'User is not participating in this event',
            HttpStatus.FORBIDDEN,
          );
        }

        const updatedEventIds = user.eventIds.filter((id) => {
          return id !== eventId;
        });
        const updatedParticipation = event.participationIds.filter((id) => {
          return id !== userId;
        });

        await tx.user.update({
          where: { id: userId },
          data: {
            eventIds: {
              set: updatedEventIds,
            },
          },
        });
        await tx.event.update({
          where: { eventId },
          data: {
            participationIds: {
              set: updatedParticipation,
            },
          },
        });
      });

      return {
        message: 'User has successfully unjoined the event',
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        `Failed to unjoin event: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
