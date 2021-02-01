import { UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection, OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';
import { WsChannelGuard } from '../guards/ws/ws.channel.guard';
import * as sharedsession from 'express-socket.io-session';
import { sessionMiddleware } from '../config/sessionmiddleware';
import { WsMemberGuard } from '../guards/ws/ws.guild.guard';
import { WsAuthGuard } from '../guards/ws/ws.auth.guard';

@WebSocketGateway({ namespace: "/ws" })
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  constructor(private socketService: SocketService) {}

  afterInit(server: Server) {
    server.use(sharedsession(sessionMiddleware, { autoSave: true }));
    this.socketService.socket = server;
  }

  async handleConnection(socket: Socket) {}

  async handleDisconnect(client: Socket): Promise<any> {}

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('toggleOnline')
  handleToggleOnline(client: Socket): void {
    console.log("Online");
    this.socketService.toggleOnlineStatus(client);
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('toggleOffline')
  handleToggleOffline(client: Socket): void {
    console.log("Offline");
    this.socketService.toggleOfflineStatus(client);
  }

  @UseGuards(WsChannelGuard)
  @SubscribeMessage('joinChannel')
  handleChannelJoin(client: Socket, room: string): void {
    client.join(room);
  }

  @UseGuards(WsMemberGuard)
  @SubscribeMessage('joinGuild')
  handleGuildJoin(client: Socket, room: string): void {
    client.join(room);
  }

  @SubscribeMessage('leaveRoom')
  handleRoomLeave(client: Socket, room: string): void {
    client.leave(room);
  }
}