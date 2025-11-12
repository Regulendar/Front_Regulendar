import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import {
  DeleteOrganizationInputDto,
  DeleteOrganizationOutputDto,
} from '../dto';
import { ValidatorUtil } from 'src/utils';

@Injectable()
export class DeleteOrganizationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly validatorUtil: ValidatorUtil,
  ) {}

  async execute({
    organizationId,
  }: DeleteOrganizationInputDto): Promise<DeleteOrganizationOutputDto> {
    try {
      const hasOrganization =
        await this.validatorUtil.validateOrganization(organizationId);
      if (!hasOrganization) {
        throw new HttpException('Organization not found', HttpStatus.NOT_FOUND);
      }
      await this.prismaService.organization.delete({
        where: { organizationId: organizationId },
      });
      return {
        message: 'Organization deleted successfully',
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
