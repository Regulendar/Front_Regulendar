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

      await this.prismaService.$transaction(async (tx) => {
        const { participationIds, hostOrganizationId } =
          await tx.event.findUnique({
            where: { eventId: id },
            select: { participationIds: true, hostOrganizationId: true },
          });
        const removeEventIdInUser = participationIds.map(
          async (participationId) => {
            const user = await tx.user.findUnique({
              where: { id: participationId },
              select: { eventIds: true },
            });
            if (user) {
              const updatedEventIds = user.eventIds.filter((eventId) => {
                return eventId !== id;
              });
              await tx.user.update({
                where: { id: participationId },
                data: {
                  eventIds: {},
                },
              });
            }
          },
        );

        await tx.organization.update({
          where: { organizationId: hostOrganizationId },
          data: {
            events: {
              delete: { eventId: id },
            },
          },
        });
        await Promise.all(removeEventIdInUser);
        await tx.event.delete({
          where: { eventId: id },
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
