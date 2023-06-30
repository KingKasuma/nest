import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect{

  @WebSocketServer() wss: Server;

  constructor(
    private readonly messagesWsService: MessagesWsService
  ) {}

  handleConnection(client: any, ...args: any[]) {
    // console.log('Cliente conectado:', client.id);
    this.messagesWsService.registerClient( client );
  }

  handleDisconnect(client: any) {
    // console.log('Cliente desconectado', client.id);
    this.messagesWsService.removeClient( client.id );
    
  }


}
