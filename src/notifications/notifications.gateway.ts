import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Server, Socket } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class NotificationsGateway implements OnModuleInit, OnGatewayConnection, OnGatewayDisconnect{

  @WebSocketServer()
  public server: Server;

  constructor(private readonly notificationsService: NotificationsService) {}
  
  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {
      // const token = socket.handshake.headers.authorization?.split(' ')[1];
      console.log('Cliente conectado')
    })
  }
 
  handleConnection(client: any, ...args: any[]) {
    // console.log(`Cliente ${client} conectado al socket`);
  }

  handleDisconnect(client: any) {
    console.log('Esto se ejecuta cuando se desconecta')
  }

  @SubscribeMessage('sendNotification')
  async emitNotification(@MessageBody() message: string) {
    let total = await this.notificationsService.saveNotification({message});
    this.server.emit('sendNotification', total)
  }
  
}
