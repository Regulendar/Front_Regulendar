import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { DeleteEventInputDto, DeleteEventOutputDto } from '../dto';
import { ValidatorUtil } from 'src/utils';

@Injectable()
export class DeleteEventService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly validationUtil: ValidatorUtil,
  ) {}

  async execute({ id }: DeleteEventInputDto): Promise<DeleteEventOutputDto> {
    try {
      const hasEvent = await this.validationUtil.validateEvent(id);
      if (!hasEvent) {
        throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
      }
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
