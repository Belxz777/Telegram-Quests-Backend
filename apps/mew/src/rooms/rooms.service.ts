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
    const room  = await this.roomsRepo.create(dto)
    console.log("Создана комната")
    return room
        }
        async addMemberToRoom(member: string, id: number) {
       const room = await this.roomsRepo.findByPk(id);
       if(!room) {
        throw new Error("Room not found");
        }
        room.members.push(member);
        return room;
    }
        async deleteRoom(id:number):Promise<void | number>{
    const deleteRoom = await this.roomsRepo.destroy({where:{id}})
    return deleteRoom
        }
// TODO добавить комнаты и также крч ты понял 
        async updateroom (dto:UpdateRoom,id:number){
            const room = await this.roomsRepo.findByPk(id);
            if (!room) {
              throw new Error('room not found');
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

                async  getAllroomsbyQuizIn(quizIn:string){
                    //для того что бы вывести всех поьзователей
                        const users   = await this.roomsRepo
                .findAll({ })
                return users
                    }
                    async addNewroom(roomId:number,quizName:string) {
                        return
                    }
                    async addNewQuest(quizId:"") {
return
                    }

                    
}
export class RoomsService {}
