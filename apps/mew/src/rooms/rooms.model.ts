import { ApiProperty } from '@nestjs/swagger'
import { STRING } from 'sequelize'
import { ARRAY } from 'sequelize'
import { TEXT,DataTypes} from 'sequelize'
import {Table,Column, DataType,Model,Sequelize} from 'sequelize-typescript'

@Table({tableName:'rooms'})
//модель нашей базы данных для взамиомдействия с ней
export class Room extends Model<Room> {
   
// мы это делаем для визуализвации эндпоинта что бы видеть что приходит на этот реквест
    @ApiProperty({example:1,description:'айди комнаты'})
    @Column({type:DataType.INTEGER,unique:true,autoIncrement:true,primaryKey:true,allowNull:false})
    id:number
    @ApiProperty({example:'Супер',description:'название комнаты'})
    @Column({type:DataType.STRING,allowNull:false})
    name:string
    @ApiProperty({example:'Чебупели , Обезьяны',description:'участнки то есть названия команд'})
    @Column({type:DataType.ARRAY(DataType.STRING),defaultValue:["",""],allowNull:true})
members:string[]
@ApiProperty({example:10,description:'максимальное количество участников'})
@Column({type:DataType.INTEGER,defaultValue:10})
maxnumberOfMembers:number
@ApiProperty({example:"квизы внутри ",description:""})
@Column({type:DataType.ARRAY(DataType.STRING),defaultValue:["",""]})
quests:string[]

}