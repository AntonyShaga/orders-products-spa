import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { WebsocketGateway } from './websocket/websocket.gateway';
import { WebsocketModule } from './websocket/websocket.module';
import { OrdersModule } from './orders/orders.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProductTypesModule } from './product-types/product-types.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    WebsocketModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      path: '/graphql',
      context: ({ req }) => ({ req }),
    }),

    OrdersModule,
    AuthModule,
    ProductTypesModule,
  ],
  controllers: [],
  providers: [WebsocketGateway],
})
export class AppModule {}
