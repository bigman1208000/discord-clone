import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from '../entities/channel.entity';
import { Message } from '../entities/message.entity';
import { User } from '../entities/user.entity';
import { SocketModule } from '../socket/socket.module';
import { PCMember } from '../entities/pcmember.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, Channel, User, PCMember]),
    SocketModule
  ],
  controllers: [MessageController],
  providers: [MessageService]
})
export class MessageModule {}
