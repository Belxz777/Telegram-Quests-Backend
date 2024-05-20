import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Quest } from './quests.model';
import sequelize from 'sequelize';
import { deleteQuest } from './dto/delete-quest';
import { CreateQuestDto,UpdateQuestDto } from './dto/create-quest';
@Injectable()
export class QuestService {
    //  модель параметрами передаем саму модель
    constructor(@InjectModel(Quest ) private questRepository : typeof Quest){

    }
     //принимает dto

async createNewQuest(dto: CreateQuestDto ) {
const quest = await this.questRepository.create(dto)
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
    async  getAllQuestsbyIP(lat:number,lon:number){
        //для того что бы вывести всех поьзователей
            const users   = await this.questRepository.findAll({
                where:{
                    lat: lat,
                    lon:lon
                }
            })
            
            users.push()
    return users
        }
            async  getAllQuestsbyQuizIn(quizIn:string){
                //для того что бы вывести всех поьзователей
                    const users   = await this.questRepository.findAll({
                        where:{
                       quizIn:quizIn
                        }
                    })

            return users
                }
                async  getAllQuestsbyQuizId(quizId:number){
                    //для того что бы вывести всех поьзователей
                        const users   = await this.questRepository.findAll({
                            where:{
                           quizId:quizId
                            }
                        })
                        const lats = {
                            lat:users[0].lat,
                            lon:users[0].lon,
                            quizId:users[0].quizId,
                            quizIn:users[0].quizIn
                        }
        return lats

                    }
}
