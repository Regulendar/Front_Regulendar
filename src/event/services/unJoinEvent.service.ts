import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { ValidatorUtil } from 'src/utils';
import { UnJoinEventInputDto, UnJoinEventOutputDto } from '../dto';

@Injectable()
export class UnJoinEventService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly validatorUtil: ValidatorUtil,
  ) {}

  async execute({
    eventId,
    userId,
  }: UnJoinEventInputDto): Promise<UnJoinEventOutputDto> {
    try {
      const hasUser = await this.validatorUtil.validateUser(userId);
      if (!hasUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const hasEvent = await this.validatorUtil.validateEvent(eventId);
      if (!hasEvent) {
        throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
      }

      const hasEventParticipation =
        await this.validatorUtil.validateEventParticipation(eventId, userId);
      if (!hasEventParticipation) {
        throw new HttpException(
          'User is not participating in this event',
          HttpStatus.FORBIDDEN,
        );
      }

      await this.prismaService.eventParticipation.delete({
        where: {
          eventId_userId: {
            eventId,
            userId,
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
