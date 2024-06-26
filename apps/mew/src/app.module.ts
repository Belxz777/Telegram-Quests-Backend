import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { QuestModule } from './quests/quests.module';
import { Quest } from './quests/quests.model';
import { RoomsController } from './rooms/rooms.controller';
import { RoomsService } from './rooms/rooms.service';
import { RoomsModule } from './rooms/rooms.module';
import { Room } from './rooms/rooms.model';

import { TeamModule } from './team/team.module';
import { Team } from './team/team.model';
//сборка в модуль контроллеров(реквесты ) и провайдеров(бизнес логики)
@Module({
controllers: [],
providers: [],
imports: [
ConfigModule.forRoot(
{
envFilePath: `.env`
}
),
SequelizeModule.forRoot({
dialect: 'postgres',
host: process.env.POSTGRES_HOST,
port: parseInt(process.env.POSTGRES_PORT),
username: process.env.POSTGRES_USER,
password: '123',
database: process.env.POSTGRES_DB,
models: [Quest,Room,Team],
autoLoadModels:true,
}),
QuestModule,
RoomsModule,
TeamModule
]
})
export class AppModule {}
