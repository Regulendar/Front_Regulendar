import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { JoinOrganizationInputDto, JoinOrganizationOutputDto } from '../dto';
import { ValidatorUtil } from 'src/utils';

@Injectable()
export class JoinOrganizationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly validatorUtil: ValidatorUtil,
  ) {}

  async execute({
    userId,
    organizationId,
  }: JoinOrganizationInputDto): Promise<JoinOrganizationOutputDto> {
    try {
      const hasOrganizationMember =
        await this.validatorUtil.validateOrganizationMember(
          organizationId,
          userId,
        );
      if (hasOrganizationMember) {
        throw new HttpException(
          'User is already a member of the organization',
          HttpStatus.BAD_REQUEST,
        );
      }

      const hasOrganization =
        await this.validatorUtil.validateOrganization(organizationId);
      if (!hasOrganization) {
        throw new HttpException('Organization not found', HttpStatus.NOT_FOUND);
      }

      await this.prismaService.organizationMember.create({
        data: {
          userId,
          organizationId,
        },
      });
      return {
        message: 'Successfully joined the organization',
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw error;
    }
  }
}
