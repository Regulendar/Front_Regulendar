import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { DeleteEventInputDto, DeleteEventOutputDto } from '../dto';
import { ValidatorUtil } from 'src/utils';

@Injectable()
export class DeleteEventService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly validatorUtil: ValidatorUtil,
  ) {}

  async execute({
    eventId,
    userId,
  }: DeleteEventInputDto): Promise<DeleteEventOutputDto> {
    try {
      const hasEvent = await this.validatorUtil.validateEvent(eventId);
      if (!hasEvent) {
        throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
      }

      const { role } = await this.validatorUtil.checkEventParticipationRole(
        eventId,
        userId,
      );
      const isEventHost = role === 'HOST';
      if (!isEventHost) {
        throw new HttpException(
          'Only event hosts can delete the event',
          HttpStatus.FORBIDDEN,
        );
      }

      await this.prismaService.$transaction(async (tx) => {
        await tx.eventParticipation.deleteMany({
          where: { eventId },
        });
        await tx.event.delete({
          where: { eventId },
        });
      });

      return {
        message: 'Event deleted successfully',
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        `Failed to delete event: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
