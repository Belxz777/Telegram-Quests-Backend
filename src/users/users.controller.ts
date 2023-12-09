import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { Param } from '@nestjs/common';
import { UpdateUserDto } from './dto/create-user-dto';
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

@Delete(':code')
//ошибка\
   deleteUser(@Param('code') code: number):Promise<void | number> {
    return this.UsersService.deletePrizoner(code);
  }
  @Patch(':code')
  async updateUser(@Param('code') code:number,
    @Body()   updateUserData:UpdateUserDto ){
        const updatedUser = await this.UsersService.updateUser(updateUserData,code);
        console.log(updatedUser,'юсер адатне');
        return updatedUser;
}
}
