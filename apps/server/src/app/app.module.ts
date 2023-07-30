import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BilliardWebSocketGateway } from './app.websocket.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, BilliardWebSocketGateway],
})
export class AppModule {}
