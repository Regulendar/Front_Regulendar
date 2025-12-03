import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EventRole } from '@prisma/client';
import { PrismaService } from 'src/prisma';
import { CreateEventInputDto, CreateEventOutputDto } from '../dto';
import { DateConverterUtil } from 'src/utils';

@Injectable()
export class CreateEventService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly dateConverterUtil: DateConverterUtil,
  ) {}

  async execute({
    eventTitle,
    eventStartAt,
    eventDuration,
    hostOrganizationId,
    hostUserId,
  }: CreateEventInputDto): Promise<CreateEventOutputDto> {
    try {
      const {
        year: eventDateYear,
        month: eventDateMonth,
        day: eventDateDay,
      } = this.dateConverterUtil.convertDateToDayParts(eventStartAt);

      await this.prismaService.$transaction(async (tx) => {
        const { eventId } = await tx.event.create({
          data: {
            eventTitle,
            eventStartAt,
            eventDateYear,
            eventDateMonth,
            eventDateDay,
            eventDuration,
            hostOrganization: {
              connect: {
                organizationId: hostOrganizationId,
              },
            },
          },
        });

        await tx.eventParticipation.create({
          data: {
            eventId,
            userId: hostUserId,
            role: EventRole.HOST,
          },
        });
      });

      return {
        status: HttpStatus.CREATED,
        message: 'Event created successfully',
      };
    } catch (error) {
      throw new HttpException(
        `Failed to create event: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
