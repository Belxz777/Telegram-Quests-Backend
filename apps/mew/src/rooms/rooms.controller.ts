import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RoomService } from './rooms.service';
import { Room } from './rooms.model';
import { CreateRoom, UpdateRoom } from './dto/create-room';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('rooms')

export class RoomsController {
constructor(private RoomService:RoomService){}
@ApiOperation({summary:'Это апишка для добавления Questov'})
@ApiResponse({status:200,type:[Room]})
@Post()
create(@Body() QuestDto:CreateRoom){
return this.RoomService.createNewRoom(QuestDto)
}
@Post(":id")
addMemberToRoom(@Body() member:string, @Param("id") id:number){
return this.RoomService.addMemberToRoom(member, id);
}
// наше описание этой апишки конкретной

@Get(':name')
getAllQuestsbyIP(@Param('name') name:string){
return this.RoomService.getRoomByName(name)
}

@Delete(':id')
//ошибка\
deleteQuest(@Param('id') id: number):Promise<void | number> {
return this.RoomService.deleteRoom(id);
}
@Patch(':id')
async updateQuest(@Param('id') id:number,
@Body()   updateQuestData:UpdateRoom){
    const updatedQuest = await this.RoomService.updateroom(updateQuestData,id);
    console.log(updatedQuest,'юсер адатне');
    return updatedQuest;
}
}
