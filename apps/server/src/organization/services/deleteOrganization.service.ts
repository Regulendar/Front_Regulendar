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
    userId,
    nameConfirmation,
  }: DeleteOrganizationInputDto): Promise<DeleteOrganizationOutputDto> {
    try {
      const hasOrganization =
        await this.validatorUtil.validateOrganization(organizationId);
      if (!hasOrganization) {
        throw new HttpException('Organization not found', HttpStatus.NOT_FOUND);
      }

      const { role } = await this.validatorUtil.checkOrganizationMemberRole(
        organizationId,
        userId,
      );
      const isOrganizationOwner = role === 'OWNER';
      if (!isOrganizationOwner) {
        throw new HttpException(
          'Only organization owners can delete the organization',
          HttpStatus.FORBIDDEN,
        );
      }

      const { organizationName } =
        await this.prismaService.organization.findUnique({
          where: { organizationId },
          select: {
            organizationName: true,
          },
        });

      const isValidNameConfirmation = organizationName === nameConfirmation;
      if (!isValidNameConfirmation) {
        throw new HttpException(
          'Organization name confirmation does not match',
          HttpStatus.BAD_REQUEST,
        );
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
