import { ApiProperty } from '@nestjs/swagger'
import { STRING } from 'sequelize'
import { ARRAY } from 'sequelize'
import { TEXT,DataTypes} from 'sequelize'
import {Table,Column, DataType,Model,Sequelize} from 'sequelize-typescript'

@Table({tableName:'quests_table'})
//модель нашей базы данных для взамиомдействия с ней
export class Quest extends Model<Quest> {
   
// мы это делаем для визуализвации эндпоинта что бы видеть что приходит на этот реквест
    @ApiProperty({example:1,description:'айди вопроса'})
    @Column({type:DataType.INTEGER,unique:true,autoIncrement:true,primaryKey:true,allowNull:false})
    id:number
    @ApiProperty({example:'Кто является главным героем фильма Уран',description:'вопрос'})
    @Column({type:DataType.STRING,allowNull:true})
    question:string
    @ApiProperty({example:'Боксер',description:'правильный ответ'})
    @Column({type:DataType.STRING,defaultValue:false,allowNull:false})
answer:string
@ApiProperty({example:['Клоун','Бизнессмен','Heудачник'],description:'Массив вариантов'})
@Column({type:DataType.ARRAY(DataType.STRING),defaultValue:['',''],allowNull:true})
variants:string[]
@ApiProperty({example:'easy',description:'сложность'})
@Column({type:DataType.STRING,defaultValue:false,allowNull:false})
hardness:string
@ApiProperty({example:'55.00323',description:'координаты широта'})
@Column({type:DataType.STRING,defaultValue:false,allowNull:false})
lat:number
@ApiProperty({example:'52.332332',description:'координаты долгота'})
@Column({type:DataType.STRING,defaultValue:false,allowNull:false})
lon:number
@ApiProperty({example:'Roman',description:'автор теста'})
@Column({type:DataType.STRING,defaultValue:false,allowNull:true})
author:string
@ApiProperty({example:'Смешарики',description:'все тесты в одном квизе'})
@Column({type:DataType.STRING,defaultValue:false,allowNull:false})
quizIn:string
@ApiProperty({example:'История',description:'Категория теста'})
@Column({type:DataType.STRING,defaultValue:false,allowNull:false})
categorie:string
@Column({type:DataType.STRING,defaultValue:"",allowNull:true})
image:string
@Column({type:DataType.BOOLEAN,allowNull:true})
rebus:boolean

}