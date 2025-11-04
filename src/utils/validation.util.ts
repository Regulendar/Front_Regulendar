import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';

@Injectable()
export class ValidationUtil {
  constructor(private readonly prismaService: PrismaService) {}

  async validateUser(userId: string): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return false;
    }
    return true;
  }

  async validateEvent(eventId: string): Promise<boolean> {
    const event = await this.prismaService.event.findUnique({
      where: { eventId },
    });
    if (!event) {
      return false;
    }
    return true;
  }

  async validateOrganization(organizationId: string): Promise<boolean> {
    const organization = await this.prismaService.organization.findUnique({
      where: { organizationId },
    });
    if (!organization) {
      return false;
    }
    return true;
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
    if (!organizationMember) {
      return false;
    }
    return true;
  }
}
