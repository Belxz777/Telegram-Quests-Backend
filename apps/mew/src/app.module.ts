import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { QuestModule } from './quests/quests.module';
import { Quest } from './quests/quests.entity';
import { TeamModule } from './team/team.module';
import { Team } from './team/team.entity';
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
TypeOrmModule.forRoot({
type: 'postgres',
url: process.env.URL ,
entities: [Quest,Team],
autoLoadEntities: true,
ssl: {
    rejectUnauthorized: false, // Adjust based on your SSL needs
  },
synchronize: true,
logging: true,
}),
QuestModule,
TeamModule
]
})
export class AppModule {}
