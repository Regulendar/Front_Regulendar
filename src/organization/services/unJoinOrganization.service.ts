import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { ValidatorUtil } from 'src/utils';
import {
  UnJoinOrganizationInputDto,
  UnJoinOrganizationOutputDto,
} from '../dto';

@Injectable()
export class UnJoinOrganizationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly validatorUtil: ValidatorUtil,
  ) {}

  async execute({
    userId,
    organizationId,
  }: UnJoinOrganizationInputDto): Promise<UnJoinOrganizationOutputDto> {
    try {
      const hasUser = await this.validatorUtil.validateUser(userId);
      if (!hasUser) {
        throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
      }
      const hasOrganization =
        await this.validatorUtil.validateOrganization(organizationId);
      if (!hasOrganization) {
        throw new HttpException(
          'Organization not found.',
          HttpStatus.NOT_FOUND,
        );
      }

      const isOrganizationMember =
        await this.validatorUtil.validateOrganizationMember(
          organizationId,
          userId,
        );
      if (!isOrganizationMember) {
        throw new HttpException(
          'User is not a member of this organization.',
          HttpStatus.FORBIDDEN,
        );
      }

      await this.prismaService.$transaction(async (tx) => {
        const organizationMember = await tx.organizationMember.findUnique({
          where: {
            organizationId_userId: {
              organizationId,
              userId,
            },
          },
          select: {
            role: true,
          },
        });
        if (!organizationMember) {
          throw new HttpException(
            'Organization member not found.',
            HttpStatus.NOT_FOUND,
          );
        }

        const isOrganizationOwner = organizationMember.role === 'OWNER';
        if (isOrganizationOwner) {
          throw new HttpException(
            'Organization owner cannot leave the organization. Please transfer ownership before leaving.',
            HttpStatus.BAD_REQUEST,
          );
        }

        const hostedEventParticipation = await tx.eventParticipation.findFirst({
          where: {
            userId,
            role: 'HOST',
            event: {
              hostOrganizationId: organizationId,
            },
          },
        });

        if (hostedEventParticipation) {
          throw new HttpException(
            'Please transfer hosted events to another user before leaving the organization.',
            HttpStatus.BAD_REQUEST,
          );
        }

        await tx.eventParticipation.deleteMany({
          where: {
            userId,
            event: {
              hostOrganizationId: organizationId,
            },
          },
        });

        await tx.organizationMember.delete({
          where: {
            organizationId_userId: {
              organizationId,
              userId,
            },
          },
        });
      });

      return {
        message: 'Successfully left the organization.',
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        `Failed to leave organization: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
