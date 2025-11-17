import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EventRole, OrganizationRole } from '@prisma/client';
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
      const userRelations = await this.prismaService.user.findUnique({
        where: { id },
        select: {
          eventParticipations: {
            select: {
              eventId: true,
              role: true,
            },
          },
          organizationMembers: {
            select: {
              organizationId: true,
              role: true,
            },
          },
        },
      });

      if (!userRelations) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const isHostingEvent = userRelations.eventParticipations.some(
        ({ role }) => {
          return role === EventRole.HOST;
        },
      );
      if (isHostingEvent) {
        throw new HttpException(
          'Cannot delete user who is hosting events',
          HttpStatus.BAD_REQUEST,
        );
      }

      const isOrganizationOwner = userRelations.organizationMembers.some(
        ({ role }) => {
          return role === OrganizationRole.OWNER;
        },
      );
      if (isOrganizationOwner) {
        throw new HttpException(
          'Cannot delete user who is an organization owner',
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.prismaService.$transaction(async (tx) => {
        await tx.eventParticipation.deleteMany({
          where: { userId: id },
        });

        await tx.organizationMember.deleteMany({
          where: { userId: id },
        });

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
