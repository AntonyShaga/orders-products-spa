import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebsocketGateway } from './websocket/websocket.gateway';
import { WebsocketModule } from './websocket/websocket.module';
import { OrdersModule } from './orders/orders.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProductTypesModule } from './product-types/product-types.module';

@Module({
  imports: [
    WebsocketModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    OrdersModule,
    AuthModule,
    ProductTypesModule,
  ],
  controllers: [AppController],
  providers: [AppService, WebsocketGateway],
})
export class AppModule {}
