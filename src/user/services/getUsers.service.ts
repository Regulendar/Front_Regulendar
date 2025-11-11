import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { GetUsersInputDto, GetUsersOutputDto } from '../dto';
import { ValidatorUtil } from 'src/utils';

@Injectable()
export class GetUsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly validationUtil: ValidatorUtil,
  ) {}

  async execute({
    organizationId,
    eventId,
    userIds,
  }: GetUsersInputDto): Promise<GetUsersOutputDto> {
    try {
      switch (true) {
        case !!eventId: {
          const hasEvent = await this.validationUtil.validateEvent(eventId);
          if (!hasEvent) {
            throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
          }
          const { participationIds } = await this.prismaService.event.findFirst(
            {
              where: { eventId },
              select: {
                participationIds: true,
              },
            },
          );
          const users = await this.prismaService.user.findMany({
            where: { id: { in: participationIds } },
            include: { organizationMembers: true },
          });
          return { users };
        }

        case !!organizationId: {
          const hasOrganization =
            await this.validationUtil.validateOrganization(organizationId);
          if (!hasOrganization) {
            throw new HttpException(
              'Organization not found',
              HttpStatus.NOT_FOUND,
            );
          }
          const { organizationMembers } =
            await this.prismaService.organization.findFirst({
              where: { organizationId },
              select: {
                organizationMembers: {
                  select: {
                    user: {
                      include: {
                        organizationMembers: true,
                      },
                    },
                  },
                },
              },
            });
          const users = organizationMembers.map(({ user }) => user);
          return { users };
        }

        case !!userIds: {
          const users = await this.prismaService.user.findMany({
            where: { id: { in: userIds } },
            include: { organizationMembers: true },
          });
          return { users };
        }

        default: {
          throw new HttpException(
            'At least one filter (organizationId, eventId, userIds) must be provided',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    } catch (error) {
      throw new HttpException(
        `Failed to get users: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
