import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteUserInputDto, DeleteUserOutputDto } from '../dto';
import { PrismaService } from 'src/prisma';
import { ValidatorUtil } from 'src/utils';

@Injectable()
export class DeleteUserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly validatorUtil: ValidatorUtil,
  ) {}

  async execute({ id }: DeleteUserInputDto): Promise<DeleteUserOutputDto> {
    try {
      const hasUser = await this.validatorUtil.validateUser(id);
      if (!hasUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const { eventIds, organizationMembers } =
        await this.prismaService.user.findUnique({
          where: { id },
          select: {
            eventIds: true,
            organizationMembers: true,
          },
        });

      await this.prismaService.$transaction(async (tx) => {
        const hostedEvents = await tx.event.findMany({
          where: { eventId: { in: eventIds }, hostUserId: id },
        });
        const hasHostedEvents = hostedEvents.length > 0;
        if (hasHostedEvents) {
          throw new HttpException(
            'Cannot delete user who is hosting events',
            HttpStatus.BAD_REQUEST,
          );
        }

        const updateParticipationIdsInEvent = eventIds.map(async (eventId) => {
          const { participationIds } = await tx.event.findUnique({
            where: { eventId },
            select: {
              participationIds: true,
            },
          });
          const updatedParticipationIds = participationIds.filter(
            (participantId) => {
              return participantId !== id;
            },
          );
          await tx.event.update({
            where: { eventId },
            data: {
              participationIds: {
                set: updatedParticipationIds,
              },
            },
          });
        });

        const isOrganizationOwner = organizationMembers.some(({ role }) => {
          return role === 'OWNER';
        });
        if (isOrganizationOwner) {
          throw new HttpException(
            'Cannot delete user who is an organization owner',
            HttpStatus.BAD_REQUEST,
          );
        }
        const deleteOrganizationMembers = organizationMembers.map(
          async ({ organizationId }) => {
            await tx.organizationMember.delete({
              where: {
                organizationId_userId: {
                  organizationId,
                  userId: id,
                },
              },
            });
          },
        );

        await Promise.all([
          updateParticipationIdsInEvent,
          deleteOrganizationMembers,
        ]);

        await tx.user.delete({
          where: { id },
        });
      });

      return {
        status: HttpStatus.OK,
        message: 'User deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        `Failed to delete user: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
