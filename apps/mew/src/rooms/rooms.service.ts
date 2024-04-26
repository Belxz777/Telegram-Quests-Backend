import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Room } from './rooms.model';
import { CreateRoom, UpdateRoom } from './dto/create-room';

@Injectable()
export class RoomService {
    //  модель параметрами передаем саму модель
    constructor(@InjectModel(Room) private roomsRepo : typeof Room){

    }
    async createNewRoom (dto:CreateRoom){
    const quest  = await this.roomsRepo.create(dto)
    console.log("Создана комната")
    return quest
        }
        
        async deleteRoom(id:number):Promise<void | number>{
    const deleteRoom = await this.roomsRepo.destroy({where:{id}})
    return deleteRoom
        }
        async updateQuest (dto:UpdateRoom,id:number){
            const room = await this.roomsRepo.findByPk(id);
            if (!room) {
              throw new Error('Quest not found');
            }
            return room.update(dto);
        }
        async  getRoomByName(name:string){
            //для того что бы вывести всех поьзователей
                const room = await this.roomsRepo.findAll({
                    where:{
                     name:name
                    }
                })
        return room
            }

                async  getAllQuestsbyQuizIn(quizIn:string){
                    //для того что бы вывести всех поьзователей
                        const users   = await this.roomsRepo
                .findAll({ })
                return users
                    }
                    async addNewQuest(quizId:"") {
                        return
                    }
}
export class RoomsService {}
