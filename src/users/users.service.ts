import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import sequelize from 'sequelize';
import { CreateUserDto } from './dto/create-user-dto';
import { DeleteUser } from './dto/delete-user-dto';
@Injectable()
export class UsersService {
    //  модель параметрами передаем саму модель
    constructor(@InjectModel(User) private userRepository : typeof User){

    }
     //принимает dto

    async createNewUser (dto:CreateUserDto){
    console.log("post request")
const user  = await this.userRepository.create(dto)
return user
    }
    async  getAllPrizoners(){
    //для того что бы вывести всех поьзователей
        const users   = await this.userRepository.findAll()
return users
    }
    
    async deletePrizoner(id:number){
console.log('delete req')
const deleteUser  = await this.userRepository.destroy({where:{id}})
return deleteUser
    }
    
}
