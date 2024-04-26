import { ApiProperty } from '@nestjs/swagger'
import {Column, DataType} from 'sequelize-typescript'

export class CreateRoom {
    @ApiProperty({example:1,description:'айди комнаты'})
    @Column({type:DataType.INTEGER,unique:true,autoIncrement:true,primaryKey:true,allowNull:false})
    id:number
    @ApiProperty({example:'Супер',description:'название комнаты'})
    @Column({type:DataType.STRING,allowNull:false})
    name:string
    @ApiProperty({example:'Чебупели , Обезьяны',description:'участнки то есть названия команд'})
    @Column({type:DataType.ARRAY(DataType.STRING),defaultValue:["",""]})
members:string[]
@ApiProperty({example:10,description:'максимальное количество участников'})
@Column({type:DataType.NUMBER,defaultValue:['','']})
maxnumberOfMembers:number
@ApiProperty({example:"квизы внутри ",description:""})
@Column({type:DataType.ARRAY(DataType.STRING),defaultValue:["",""]})
quests:string[]

}
export class UpdateRoom {
    @ApiProperty({example:1,description:'айди комнаты'})
    @Column({type:DataType.INTEGER,unique:true,autoIncrement:true,primaryKey:true,allowNull:false})
    id:number
    @ApiProperty({example:'Супер',description:'название комнаты'})
    @Column({type:DataType.STRING,allowNull:false})
    name:string
    @ApiProperty({example:'Чебупели , Обезьяны',description:'участнки то есть названия команд'})
    @Column({type:DataType.ARRAY(DataType.STRING),defaultValue:["",""]})
members:string[]
@ApiProperty({example:10,description:'максимальное количество участников'})
@Column({type:DataType.NUMBER,defaultValue:['','']})
maxnumberOfMembers:number
@ApiProperty({example:"квизы внутри ",description:""})
@Column({type:DataType.ARRAY(DataType.STRING),defaultValue:["",""]})
quests:string[]

}