import { Module } from '@nestjs/common';
import { IntrospectAndCompose } from '@apollo/gateway';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import FileUploadDataSource from '@profusion/apollo-federation-upload';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        playground: true,
      },
      gateway: {
        buildService: ({ url }) => new FileUploadDataSource({ url }),
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'users', url: 'http://localhost:3001/graphql' },
            { name: 'work-spaces', url: 'http://localhost:3002/graphql' },
            { name: 'files', url: 'http://localhost:3003/graphql' },
          ],
        }),
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
