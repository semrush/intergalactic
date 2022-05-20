import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController, Mailer } from './app.controller';
import { PageModule } from './page/page.module';
import { DocumentationModule } from './documentation/documentation.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      // enable GraphQL playground for production
      // https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/#enabling-graphql-playground-in-production
      // playground: true,
      // introspection: true,
    }),
    PageModule,
    DocumentationModule,
  ],
  providers: [],
  controllers: [AppController, Mailer],
})
export class AppModule {}
