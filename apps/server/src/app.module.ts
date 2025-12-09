import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'node:path';
import { UserModule } from './user';
import { PrismaModule } from './prisma';
import { EventModule } from './event';
import { UtilModule } from './utils';
import { OrganizationModule } from './organization';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(
        process.cwd(),
        '../../packages/shared/graphql/schema.gql',
      ),
      introspection: false,
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
