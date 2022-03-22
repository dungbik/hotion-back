import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { IntrospectAndCompose } from '@apollo/gateway';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import FileUploadDataSource from '@profusion/apollo-federation-upload';
import { JwtMiddleware } from './jwt.middleware';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        playground: true,
        context: ({ req }) => ({ user_id: req['user_id'] }),
      },
      gateway: {
        buildService: ({ url }) =>
          new FileUploadDataSource({
            url,
            willSendRequest({ request, context }) {
              request.http.headers.set('user_id', context['user_id']);
            },
          }),
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'users', url: 'http://user:3001/graphql' },
            { name: 'work-spaces', url: 'http://work-space:3002/graphql' },
            { name: 'files', url: 'http://file:3003/graphql' },
          ],
        }),
      },
    }),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: { host: 'auth', port: 5001 },
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes({
      path: '/graphql',
      method: RequestMethod.POST,
    });
  }
}
