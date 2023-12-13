import { ApiProperty } from '@nestjs/swagger'
import {Table,Column, DataType,Model} from 'sequelize-typescript'

export class CreateQuestDto {
    @ApiProperty({example:1,description:'айди вопроса'})
    @Column({type:DataType.INTEGER,unique:true,autoIncrement:true,primaryKey:true,allowNull:false})
    id:number
    @ApiProperty({example:'Кто является главным героем фильма Уран',description:'вопрос'})
    @Column({type:DataType.STRING,allowNull:false})
    question:string
    @ApiProperty({example:'Боксер',description:'правильный ответ'})
    @Column({type:DataType.STRING,defaultValue:false})
answer:string
@ApiProperty({example:['Клоун','Бизнессмен','Heудачник'],description:'Массив вариантов'})
@Column({type:DataType.ARRAY(DataType.STRING),defaultValue:['','']})
variants:[]
@ApiProperty({example:'101.10.293.21',description:'Местоположение'})
@Column({type:DataType.STRING,defaultValue:false})
location:string
@ApiProperty({example:'easy',description:'сложность'})
@Column({type:DataType.STRING,defaultValue:false})
hardness:string
}
export class UpdateQuestDto {
    @ApiProperty({example:'Кто является главным героем фильма Уран',description:'вопрос'})
    @Column({type:DataType.STRING,allowNull:false})
    question:string
    @ApiProperty({example:'Боксер',description:'правильный ответ'})
    @Column({type:DataType.STRING,defaultValue:false})
answer:string
@ApiProperty({example:['Клоун','Бизнессмен','Heудачник'],description:'Массив вариантов'})
@Column({type:DataType.ARRAY(DataType.STRING),defaultValue:['','']})
variants:[]
@ApiProperty({example:'101.10.293.21',description:'Местоположение'})
@Column({type:DataType.STRING,defaultValue:false})
location:string
@ApiProperty({example:'easy',description:'сложность'})
@Column({type:DataType.STRING,defaultValue:false})
hardness:string
}