import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { cuid } from '@billiard/helpers';

@WebSocketGateway(5000, { cors: { origin: 'http://localhost:3000' } })
export class BilliardWebSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;

  rooms: Map<string, any> = new Map();
  gameState: Map<string, any> = new Map();

  handleConnection(socket: Socket): void {
    console.log('new connection ', socket.id);
    this.rooms.set(socket.id, null);
  }

  handleDisconnect(socket: Socket): void {
    console.log('client disconnected ', socket.id);
  }

  @SubscribeMessage('new-game')
  async handleNewGame(): Promise<void> {
    const id = cuid();

    console.log('handle new game', id);
  }
}
