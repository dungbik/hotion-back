import { Module } from '@nestjs/common';
import { IntrospectAndCompose } from '@apollo/gateway';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        playground: true,
        cors: true,
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'users', url: 'http://localhost:3001/graphql' },
            { name: 'work-spaces', url: 'http://localhost:3002/graphql' },
            { name: 'pages', url: 'http://localhost:3003/graphql' },
          ],
        }),
      },
    }),
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
