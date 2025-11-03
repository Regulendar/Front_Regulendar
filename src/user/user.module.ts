import { Module } from '@nestjs/common';

import * as UserResolvers from './resolvers';
import * as UserServices from './services';
import { PrismaService } from 'src/prisma';

const Resolvers = Object.values(UserResolvers);
const Services = Object.values(UserServices);

@Module({
  providers: [...Resolvers, ...Services, PrismaService],
})
export class UserModule {}
