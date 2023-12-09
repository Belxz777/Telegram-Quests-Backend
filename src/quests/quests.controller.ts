import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CreateQuestDto } from './dto/create-quest';
import { QuestService } from './quest.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Quest } from './quests.model';
import { Param } from '@nestjs/common';
import { UpdateQuestDto } from './dto/create-quest';
@Controller('Quests')
export class QuestsController {
    constructor(private QuestService:QuestService){

    }
    @ApiOperation({summary:'Это апишка для добавления Questov'})
    @ApiResponse({status:200,type:[Quest]})
@Post()
    create(@Body() QuestDto:CreateQuestDto){
return this.QuestService.createNewQuest(QuestDto)
    }
// наше описание этой апишки конкретной
    @ApiOperation({summary:'Это апишка для поиска всех Questov'})
    @ApiResponse({status:200,type:[Quest]})
@Get()
getAllQuests(){
    return this.QuestService.getAllQuests()
}

@Delete(':id')
//ошибка\
   deleteQuest(@Param('id') id: number):Promise<void | number> {
    return this.QuestService.deleteQuest(id);
  }
  @Patch(':id')
  async updateQuest(@Param('id') id:number,
    @Body()   updateQuestData:UpdateQuestDto ){
        const updatedQuest = await this.QuestService.updateQuest(updateQuestData,id);
        console.log(updatedQuest,'юсер адатне');
        return updatedQuest;
}
}
