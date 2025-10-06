import { Module } from '@nestjs/common';

import * as AddUserResolvers from './resolvers';
import * as AddUserServices from './services';
import { PrismaService } from 'src/prisma';

const Resolvers = Object.values(AddUserResolvers);
const Services = Object.values(AddUserServices);

@Module({
  providers: [...Resolvers, ...Services, PrismaService],
})
export class UserModule {}
