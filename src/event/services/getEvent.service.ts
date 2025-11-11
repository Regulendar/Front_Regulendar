import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { GetEventInputDto, GetEventOutputDto } from '../dto';

@Injectable()
export class GetEventService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ id }: GetEventInputDto): Promise<GetEventOutputDto> {
    try {
      const event = await this.prismaService.event.findUnique({
        where: { eventId: id },
      });
      if (!event) {
        throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
      }

      return { event };
    } catch (error) {
      throw new HttpException(
        `Failed to get event: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
