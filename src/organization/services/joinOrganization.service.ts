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
      const hasUser = await this.validatorUtil.validateOrganization(userId);
      if (!hasUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
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
