import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { GetOrganizationInputDto, GetOrganizationOutputDto } from '../dto';

@Injectable()
export class GetOrganizationService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({
    organizationId,
  }: GetOrganizationInputDto): Promise<GetOrganizationOutputDto> {
    try {
      const organization = await this.prismaService.organization.findUnique({
        where: {
          organizationId,
        },
        include: {
          events: true,
          organizationMembers: true,
        },
      });

      if (!organization) {
        throw new HttpException('Organization not found', HttpStatus.NOT_FOUND);
      }

      return { organization };
    } catch (error) {
      throw new HttpException(
        `Failed to get organization: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
