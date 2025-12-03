import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GetOrganizationsInputDto, GetOrganizationsOutputDto } from '../dto';
import { ValidatorUtil } from 'src/utils';

@Injectable()
export class GetOrganizationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly validatorUtil: ValidatorUtil,
  ) {}

  async execute({
    userId,
    skip,
    take,
  }: GetOrganizationsInputDto): Promise<GetOrganizationsOutputDto> {
    try {
      const hasUser = await this.validatorUtil.validateUser(userId);
      if (!hasUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const organizations = await this.prisma.organization.findMany({
        where: {
          organizationMembers: {
            none: {
              userId,
            },
          },
        },
        skip,
        take,
        orderBy: { organizationName: 'asc' },
        include: {
          events: {
            include: {
              eventParticipations: true,
            },
          },
          organizationMembers: true,
        },
      });

      const hasOrganizations = organizations.length > 0;
      if (!hasOrganizations) {
        return {
          organizations: [],
        };
      }

      return {
        organizations,
      };
    } catch (error) {
      throw new HttpException(
        `Failed to get organizations: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
