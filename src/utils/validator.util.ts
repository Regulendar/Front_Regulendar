import { Injectable } from '@nestjs/common';
import { $Enums } from '@prisma/client';
import { PrismaService } from 'src/prisma';

@Injectable()
export class ValidatorUtil {
  constructor(private readonly prismaService: PrismaService) {}

  async validateUser(userId: string): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    return !!user;
  }

  async validateEvent(eventId: string): Promise<boolean> {
    const event = await this.prismaService.event.findUnique({
      where: { eventId },
    });
    return !!event;
  }

  async validateOrganization(organizationId: string): Promise<boolean> {
    const organization = await this.prismaService.organization.findUnique({
      where: { organizationId },
    });
    return !!organization;
  }

  async validateOrganizationMember(
    organizationId: string,
    userId: string,
  ): Promise<boolean> {
    const organizationMember =
      await this.prismaService.organizationMember.findUnique({
        where: {
          organizationId_userId: {
            organizationId,
            userId,
          },
        },
      });
    return !!organizationMember;
  }

  async checkOrgnizationMemberRole(
    organizationId: string,
    userId: string,
  ): Promise<{ role: $Enums.OrganizationRole }> {
    {
      const { role } = await this.prismaService.organizationMember.findUnique({
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
      return { role };
    }
  }
}
