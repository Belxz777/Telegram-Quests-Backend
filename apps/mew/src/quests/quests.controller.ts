import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CreateQuestDto } from './dto/create-quest';
import { QuestService } from './quest.service';
import { ApiResponse } from '@nestjs/swagger';
import { Quest } from './quests.entity';
import { Param } from '@nestjs/common';
import { UpdateQuestDto } from './dto/create-quest';
@Controller('Quests')
export class QuestsController {
    constructor(private QuestService:QuestService){

    }
    @ApiResponse({status:200 | 404,type:[Quest]})
@Post()
    create(@Body() QuestDto:CreateQuestDto){
        const isRebus= QuestDto.rebus
        
        if(isRebus){
            return this.QuestService.createNewQuest(QuestDto)
        }
return this.QuestService.createNewQuest(QuestDto)
    }
    @ApiResponse({status:200 | 404,type:[Quest]})
@Get()
getAllQuests(){
    return this.QuestService.getAllQuests()
}
@Get('byCoordinates/:lat/:lon')
getAllQuestsbyIP(@Param('lat') lat: number, @Param('lon') lon:number){
    return this.QuestService.getAllQuestsbyAddress(lat,lon)
}
@Get('questsForTeam/:team')
    getAllQuestsbyTeam(@Param('team') team: string): Promise<any> {
        return this.QuestService.getAllTeamQuests(team)
    }
@Get('byName/:quizName')
getAllQuestsbyQuizIn(@Param('quizName') quizName:string){
    return this.QuestService.getAllQuestsbyQuizIn(quizName)
}
@Get('byId/:quizId')
getAllQuestsbyQuizId(@Param('quizId') quizId:number){
    console.log(quizId)
    return this.QuestService.getAllQuestsbyQuizId(quizId)
}
@Delete(':id')
   deleteQuest(@Param('id') id: number):Promise<void | number> {
    return this.QuestService.deleteQuest(id);
  }
  @Patch(':id')
  async updateQuest(@Param('id') id:number,
    @Body()   updateQuestData:UpdateQuestDto ){
        const updatedQuest = await this.QuestService.updateQuest(updateQuestData,id);
        return updatedQuest;
}
}
