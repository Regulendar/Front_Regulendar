import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { GetUsersInputDto, GetUsersOutputDto } from '../dto';
import { ValidatorUtil } from 'src/utils';

@Injectable()
export class GetUsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly validatorUtil: ValidatorUtil,
  ) {}

  async execute({
    organizationId,
    eventId,
    userIds,
  }: GetUsersInputDto): Promise<GetUsersOutputDto> {
    try {
      const hasOrganization =
        await this.validatorUtil.validateOrganization(organizationId);
      if (organizationId && !hasOrganization) {
        throw new HttpException('Organization not found', HttpStatus.NOT_FOUND);
      }

      const hasEvent = await this.validatorUtil.validateEvent(eventId);
      if (eventId && !hasEvent) {
        throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
      }

      const users = await this.prismaService.user.findMany({
        where: {
          ...(userIds && {
            id: { in: userIds },
          }),
          ...(eventId && {
            eventParticipations: {
              some: {
                eventId,
              },
            },
          }),
          ...(organizationId && {
            organizationMembers: {
              some: {
                organizationId,
              },
            },
          }),
        },
        include: {
          organizationMembers: true,
          eventParticipations: true,
        },
      });
      const hasUsers = users.length > 0;
      if (!hasUsers) {
        return { users: [] };
      }
      return { users };
    } catch (error) {
      throw new HttpException(
        `Failed to get users: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
