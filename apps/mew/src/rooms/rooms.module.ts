import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomService } from './rooms.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Room } from './rooms.model';

@Module({
    controllers: [RoomsController],
    providers: [RoomService],
    imports : [
      SequelizeModule.forFeature([Room])
    ]
  })
export class RoomsModule {}
