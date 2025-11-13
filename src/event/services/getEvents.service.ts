import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { GetEventsInputDto, GetEventsOutputDto } from '../dto';

@Injectable()
export class GetEventsService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({
    userId,
    organizationId,
    eventDateYear,
    eventDateMonth,
    eventDateDay,
  }: GetEventsInputDto): Promise<GetEventsOutputDto> {
    try {
      const events = await this.prismaService.event.findMany({
        where: {
          ...(userId && {
            eventParticipations: {
              some: {
                userId,
              },
            },
          }),
          hostOrganizationId: organizationId,
          eventDateYear,
          eventDateMonth,
          eventDateDay,
        },
        include: {
          eventParticipations: {
            select: {
              eventId: true,
              userId: true,
              role: true,
            },
          },
        },
      });

      const hasEvent = events && events.length > 0;
      if (!hasEvent) {
        throw new HttpException('Events not found', HttpStatus.NOT_FOUND);
      }

      return { events };
    } catch (error) {
      throw new HttpException(
        `Failed to get event: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
