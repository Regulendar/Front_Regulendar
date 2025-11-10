import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { UnJoinEventInputDto, UnJoinEventOutputDto } from '../dto';
import { ValidatorUtil } from 'src/utils';

@Injectable()
export class UnJoinEventService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly validationUtil: ValidatorUtil,
  ) {}

  async execute({
    eventId,
    userId,
  }: UnJoinEventInputDto): Promise<UnJoinEventOutputDto> {
    try {
      const hasUser = await this.validationUtil.validateUser(userId);
      if (!hasUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const hasEvent = await this.validationUtil.validateEvent(eventId);
      if (!hasEvent) {
        throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
      }

      const { participationIds } = await this.prismaService.event.findUnique({
        where: { eventId },
        select: { participationIds: true },
      });
      const isUserParticipating = participationIds.includes(userId);
      if (!isUserParticipating) {
        throw new HttpException(
          'User is not participating in this event',
          HttpStatus.FORBIDDEN,
        );
      }

      const { eventIds } = await this.prismaService.user.findUnique({
        where: { id: userId },
        select: { eventIds: true },
      });
      const updatedEventIds = eventIds.filter((id) => {
        return id !== eventId;
      });
      await this.prismaService.user.update({
        where: { id: userId },
        data: {
          eventIds: {
            set: updatedEventIds,
          },
        },
      });
      const updatedParticipation = participationIds.filter((id) => {
        return id !== userId;
      });
      await this.prismaService.event.update({
        where: { eventId },
        data: {
          participationIds: {
            set: updatedParticipation,
          },
        },
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
