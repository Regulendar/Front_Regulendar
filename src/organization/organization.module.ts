import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import * as OrganizationResolvers from './resolvers';
import * as OrganizationServices from './services';

const Resolvers = Object.values(OrganizationResolvers);
const Services = Object.values(OrganizationServices);

@Module({
  providers: [...Resolvers, ...Services, PrismaService],
})
export class OrganizationModule {}
