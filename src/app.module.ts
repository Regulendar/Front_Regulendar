import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user';
import { PrismaModule } from './prisma';
import { EventModule } from './event';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      graphiql: true,
    }),
    PrismaModule,
    UserModule,
    EventModule,
  ],
})
export class AppModule {}
