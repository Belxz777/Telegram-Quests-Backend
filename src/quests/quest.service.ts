import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Quest } from './quests.model';
import sequelize from 'sequelize';
import { deleteQuest } from './dto/delete-quest';
import { CreateQuestDto,UpdateQuestDto } from './dto/create-quest';
@Injectable()
export class QuestService {
    //  модель параметрами передаем саму модель
    constructor(@InjectModel(Quest) private questRepository : typeof Quest){

    }
     //принимает dto

    async createNewQuest (dto:CreateQuestDto){
    console.log("post request")
const quest  = await this.questRepository.create(dto)
return quest
    }
    async  getAllQuests(){
    //для того что бы вывести всех поьзователей
        const users   = await this.questRepository.findAll()
return users
    }
    
    async deleteQuest(id:number):Promise<void | number>{
console.log('delete req')
const deleteUser  = await this.questRepository.destroy({where:{id}})
return deleteUser
    }
    async updateQuest (dto:UpdateQuestDto,id:number){
        console.log("update request",id)
        const user = await this.questRepository.findByPk(id);
        if (!user) {
          throw new Error('Quest not found');
        }
        return user.update(dto);
    }
    async  getAllQuestsbyIP(ip:number){
        //для того что бы вывести всех поьзователей
            const users   = await this.questRepository.findAll({
                where:{
                    location:ip
                }
            })
    return users
        }
        
}
