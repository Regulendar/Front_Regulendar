import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { ValidatorUtil } from 'src/utils';
import {
  UnJoinOrganizationInputDto,
  UnJoinOrganizationOutputDto,
} from '../dto';

@Injectable()
export class UnJoinOrganizationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly validatorUtil: ValidatorUtil,
  ) {}

  async execute({
    userId,
    organizationId,
  }: UnJoinOrganizationInputDto): Promise<UnJoinOrganizationOutputDto> {
    try {
      const hasUser = await this.validatorUtil.validateUser(userId);
      if (!hasUser) {
        throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
      }
      const hasOrganization =
        await this.validatorUtil.validateOrganization(organizationId);
      if (!hasOrganization) {
        throw new HttpException(
          'Organization not found.',
          HttpStatus.NOT_FOUND,
        );
      }

      await this.prismaService.$transaction(async (tx) => {
        const { role } = await tx.organizationMember.findUnique({
          where: {
            organizationId_userId: {
              organizationId,
              userId,
            },
          },
          select: {
            role: true,
          },
        });
        const isOrganizationOwner = role === 'OWNER';
        if (isOrganizationOwner) {
          throw new HttpException(
            'Organization owner cannot leave the organization. Please transfer ownership before leaving.',
            HttpStatus.BAD_REQUEST,
          );
        }

        const { events } = await tx.organization.findUnique({
          where: { organizationId },
          select: {
            events: {
              where: {
                participationIds: {
                  has: userId,
                },
              },
              select: {
                eventId: true,
                participationIds: true,
              },
            },
          },
        });
        const unJoinOrganizationEvents = events.map(
          ({ eventId, participationIds }) => {
            const updatedParticipationIds = participationIds.filter((id) => {
              return id !== userId;
            });
            return tx.event.update({
              where: { eventId },
              data: {
                participationIds: {
                  set: updatedParticipationIds,
                },
              },
            });
          },
        );

        await tx.organizationMember.delete({
          where: {
            organizationId_userId: {
              organizationId,
              userId,
            },
          },
        });
        await Promise.all(unJoinOrganizationEvents);
      });

      return {
        message: 'Successfully left the organization.',
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw error;
    }
  }
}
