import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { JoinEventInputDto, JoinEventOutputDto } from '../dto';
import { ValidatorUtil } from 'src/utils';

@Injectable()
export class JoinEventService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly validatorUtil: ValidatorUtil,
  ) {}

  async execute({
    eventId,
    userId,
  }: JoinEventInputDto): Promise<JoinEventOutputDto> {
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
      if (hasEventParticipation) {
        throw new HttpException(
          'User is already participating in this event',
          HttpStatus.CONFLICT,
        );
      }

      await this.prismaService.eventParticipation.create({
        data: {
          eventId,
          userId,
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
