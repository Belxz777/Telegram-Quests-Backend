import { Module } from '@nestjs/common';
import { QuestService } from './quest.service';;
import { Quest } from './quests.entity';
import { QuestsController } from './quests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from '../team/team.entity';

@Module({
  controllers: [QuestsController],
  providers: [QuestService],
  imports : [
    TypeOrmModule.forFeature([Quest,Team])
  ]
})
export class QuestModule {}
