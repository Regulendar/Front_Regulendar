import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateEventInputDto, UpdateEventOutputDto } from '../dto';
import { PrismaService } from 'src/prisma';
import { DateConverterUtil, ValidatorUtil } from 'src/utils';
import { EventStatus } from '@generated-prisma/enums';

@Injectable()
export class UpdateEventService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly validatorUtil: ValidatorUtil,
    private readonly dateConverterUtil: DateConverterUtil,
  ) {}

  async execute({
    eventId,
    eventTitle,
    eventStartAt,
    eventDuration,
    eventStatus,
  }: UpdateEventInputDto): Promise<UpdateEventOutputDto> {
    try {
      const hasEvent = await this.validatorUtil.validateEvent(eventId);
      if (!hasEvent) {
        throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
      }

      const updateData: {
        eventTitle?: string;
        eventStartAt?: Date;
        eventDateYear?: number;
        eventDateMonth?: number;
        eventDateDay?: number;
        eventDuration?: number;
        eventStatus?: EventStatus;
      } = {};

      if (eventTitle) {
        updateData.eventTitle = eventTitle;
      }

      if (eventStartAt) {
        const {
          year: eventDateYear,
          month: eventDateMonth,
          day: eventDateDay,
        } = this.dateConverterUtil.convertDateToDayParts(eventStartAt);
        updateData.eventStartAt = eventStartAt;
        updateData.eventDateYear = eventDateYear;
        updateData.eventDateMonth = eventDateMonth;
        updateData.eventDateDay = eventDateDay;
      }

      if (eventDuration) {
        updateData.eventDuration = eventDuration;
      }

      if (eventStatus) {
        updateData.eventStatus = eventStatus;
      }

      await this.prisma.event.update({
        where: { eventId },
        data: updateData,
      });

      return {
        message: 'Event updated successfully',
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        `Failed to update event: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
