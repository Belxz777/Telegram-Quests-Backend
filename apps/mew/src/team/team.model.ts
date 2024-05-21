import { ApiProperty } from '@nestjs/swagger'
import { STRING } from 'sequelize'
import { ARRAY } from 'sequelize'
import { TEXT,DataTypes} from 'sequelize'
import {Table,Column, DataType,Model,Sequelize} from 'sequelize-typescript'

@Table({tableName:'teams'})
//модель нашей базы данных для взамиомдействия с ней
export class Team extends Model<Team> {
   
// мы это делаем для визуализвации эндпоинта что бы видеть что приходит на этот реквест
    @Column({type:DataType.INTEGER,unique:true,autoIncrement:true,primaryKey:true,allowNull:false})
    id:number
    @ApiProperty({example:'Супер',description:'название комнаты'})
    @Column({type:DataType.STRING,allowNull:false})
    name:string 
@Column({type:DataType.ARRAY(DataType.STRING),defaultValue:[],allowNull:true})
solved:string[]
@Column({ type: DataType.ARRAY(DataType.STRING),defaultValue:[], allowNull: true })
imageDataUrl: string[];
}