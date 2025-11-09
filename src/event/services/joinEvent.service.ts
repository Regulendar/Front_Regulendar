import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { JoinEventInputDto, JoinEventOutputDto } from '../dto';
import { ValidationUtil } from 'src/utils';

@Injectable()
export class JoinEventService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly validationUtil: ValidationUtil,
  ) {}

  async execute({
    eventId,
    userId,
  }: JoinEventInputDto): Promise<JoinEventOutputDto> {
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
        select: {
          participationIds: true,
        },
      });
      const isUserParticipating = participationIds.includes(userId);
      if (isUserParticipating) {
        throw new HttpException(
          'User is already participating in this event',
          HttpStatus.CONFLICT,
        );
      }

      const { eventIds } = await this.prismaService.user.findUnique({
        where: { id: userId },
        select: { eventIds: true },
      });
      const updatedEventIds = [...eventIds, eventId];
      await this.prismaService.user.update({
        where: { id: userId },
        data: {
          eventIds: {
            set: updatedEventIds,
          },
        },
      });

      const updatedParticipation = [...participationIds, userId];
      await this.prismaService.event.update({
        where: { eventId },
        data: {
          participationIds: {
            set: updatedParticipation,
          },
        },
      });

      return {
        message: 'User joined the event successfully',
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        `Failed to join event: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
