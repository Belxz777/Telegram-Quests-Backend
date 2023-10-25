import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { Param } from '@nestjs/common';
@ApiTags('пользователи, но на самом деле  зеки')
@Controller('users')
export class UsersController {
    constructor(private UsersService:UsersService){

    }
    @ApiOperation({summary:'Это апишка для добавления userov'})
    @ApiResponse({status:200,type:[User]})
@Post()
    create(@Body() userDto:CreateUserDto){
return this.UsersService.createNewUser(userDto)
    }
// наше описание этой апишки конкретной
    @ApiOperation({summary:'Это апишка для поиска всех userov'})
    @ApiResponse({status:200,type:[User]})
@Get()
getAllUsers(){
    return this.UsersService.getAllPrizoners()
}

@Delete(':id')
//ошибка\
   deleteUser(@Param('id') id: number): {

    const req = this.UsersService.deletePrizoner(id);
    return req
  }
}
