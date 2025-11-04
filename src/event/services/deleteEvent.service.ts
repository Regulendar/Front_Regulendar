import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { DeleteEventInputDto, DeleteEventOutputDto } from '../dto';

@Injectable()
export class DeleteEventService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ id }: DeleteEventInputDto): Promise<DeleteEventOutputDto> {
    try {
      await this.prismaService.event.delete({
        where: { eventId: id },
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
