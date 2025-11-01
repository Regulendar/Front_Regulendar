import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import * as EventResolvers from './resolvers';
import * as EventServices from './services';

const Resolvers = Object.values(EventResolvers);
const Services = Object.values(EventServices);

@Module({
  providers: [...Resolvers, ...Services, PrismaService],
})
export class EventModule {}
