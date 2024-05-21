import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Quest } from './quests.model';
import sequelize from 'sequelize';
import { deleteQuest } from './dto/delete-quest';
import { CreateQuestDto,UpdateQuestDto } from './dto/create-quest';
import { Team } from '../team/team.model';
interface QuestsProposed {
    lat:number,
    lon:number,
    name:string,
    id:number
}
@Injectable()
export class QuestService {
    //  модель параметрами передаем саму модель
    constructor(@InjectModel(Quest ) private questRepository : typeof Quest,@InjectModel(Team) private teamRepository : typeof Team){

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
    async getAllTeamQuests(team: string) {
        const thisTeam = await this.teamRepository.findOne({
            where: {
                name: team
            }
        })
        function getUniqueValues(final: string[], alreadySolved: string[]): string[] {
            return final.filter(value => !alreadySolved.includes(value));
        }

        let alreadySolved = thisTeam.solved
        let final = [];

        const quests = await this.questRepository.findAll();
        quests.forEach((item) => {
            if (final.includes(item.quizIn)) {
                return;
            }
            final.push(item.quizIn)
        })
        let uniqueValues = getUniqueValues(final, alreadySolved);
        console.log(uniqueValues)
        const questsToReturn = await this.questRepository.findAll(
            {
                where: {
                  quizIn:uniqueValues
                }
            }
        )
        const locations:QuestsProposed[] = []
        questsToReturn.map((item,index)=>{
            if (locations.some(location => location.name === item.quizIn)) {
                return;
            }
    

locations.push({
    lat: item.lat,
    lon: item.lon,
    name:item.quizIn,
    id:Number(item.quizId)
})
        })
        return locations
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
