import { Module } from '@nestjs/common';
import { QuestService } from './quest.service';
import { Sequelize } from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import { Quest } from './quests.model';
import { QuestsController } from './quests.controller';
import { Team } from '../team/team.model';

@Module({
  controllers: [QuestsController],
  providers: [QuestService],
  imports : [
    SequelizeModule.forFeature([Quest,Team])
  ]
})
export class QuestModule {}
