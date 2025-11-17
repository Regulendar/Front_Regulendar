import { Injectable } from '@nestjs/common';
import { EventRole, OrganizationRole } from '@prisma/client';
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

  async validateEventParticipation(
    eventId: string,
    userId: string,
  ): Promise<boolean> {
    const eventParticipation =
      await this.prismaService.eventParticipation.findUnique({
        where: {
          eventId_userId: {
            eventId,
            userId,
          },
        },
      });
    return !!eventParticipation;
  }

  async checkOrganizationMemberRole(
    organizationId: string,
    userId: string,
  ): Promise<{ role: OrganizationRole }> {
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

  async checkEventParticipationRole(
    eventId: string,
    userId: string,
  ): Promise<{ role: EventRole }> {
    {
      const { role } = await this.prismaService.eventParticipation.findUnique({
        where: {
          eventId_userId: {
            eventId,
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
