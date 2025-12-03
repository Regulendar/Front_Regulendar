import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import {
  CreateOrganizationInputDto,
  CreateOrganizationOutputDto,
} from '../dto';
import { ValidatorUtil } from 'src/utils';

@Injectable()
export class CreateOrganizationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly validatorUtil: ValidatorUtil,
  ) {}

  async execute({
    ownerUserId,
    organizationName,
    organizationDescription,
  }: CreateOrganizationInputDto): Promise<CreateOrganizationOutputDto> {
    try {
      const hasUser = await this.validatorUtil.validateUser(ownerUserId);
      if (!hasUser) {
        throw new HttpException(
          'Owner user does not exist',
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.prismaService.organization.create({
        data: {
          organizationName,
          organizationDescription,
          organizationMembers: {
            create: {
              userId: ownerUserId,
              role: 'OWNER',
            },
          },
        },
      });

      return {
        status: HttpStatus.CREATED,
        message: 'Organization created successfully',
      };
    } catch (error) {
      throw new HttpException(
        `Failed to create organization: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
