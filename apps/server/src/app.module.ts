import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user';
import { PrismaModule } from './prisma';
import { EventModule } from './event';
import { UtilModule } from './utils';
import { OrganizationModule } from './organization';
import { join } from 'node:path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(
        process.cwd(),
        '../../packages/shared/graphql/schema.gql',
      ),
      graphiql: true,
    }),
    PrismaModule,
    UtilModule,
    OrganizationModule,
    UserModule,
    EventModule,
  ],
})
export class AppModule {}
