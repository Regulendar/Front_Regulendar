import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { CreateEventInputDto, CreateEventOutputDto } from '../dto';

@Injectable()
export class CreateEventService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({
    eventTitle,
    eventStartAt,
    eventDuration,
    hostOrganizationId,
    hostUserId,
  }: CreateEventInputDto): Promise<CreateEventOutputDto> {
    try {
      const eventDateYear = eventStartAt.getUTCFullYear();
      const eventDateMonth = eventStartAt.getUTCMonth() + 1;
      const eventDateDay = eventStartAt.getDate();
      await this.prismaService.event.create({
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
          hostUserId,
          participationId: [],
        },
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
