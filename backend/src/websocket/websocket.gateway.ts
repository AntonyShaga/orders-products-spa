import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3001',
    credentials: true,
  },
})
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private getCount(): number {
    return this.server.sockets.sockets.size;
  }

  handleConnection(client: Socket) {
    const count = this.getCount();
    console.log(`Client connected: ${client.id}. Total: ${count}`);

    client.emit('activeSessions', count);

    this.server.emit('activeSessions', count);
  }

  handleDisconnect(client: Socket) {
    const count = this.getCount();
    console.log(`Client disconnected: ${client.id}. Total: ${count}`);

    this.server.emit('activeSessions', count);
  }

  @SubscribeMessage('getSessions')
  handleGetSessions(@ConnectedSocket() client: Socket) {
    const count = this.getCount();

    client.emit('activeSessions', count);
  }
}
