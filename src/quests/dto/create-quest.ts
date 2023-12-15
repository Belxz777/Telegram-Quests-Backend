import { ApiProperty } from '@nestjs/swagger'
import {Table,Column, DataType,Model} from 'sequelize-typescript'

export class CreateQuestDto {
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
@ApiProperty({example:'55.00323',description:'координаты широта'})
@Column({type:DataType.STRING,defaultValue:false})
lat:number
@ApiProperty({example:'52.332332',description:'координаты долгота'})
@Column({type:DataType.STRING,defaultValue:false})
lon:number

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
@ApiProperty({example:'55.00323',description:'координаты широта'})
@Column({type:DataType.STRING,defaultValue:false})
lat:number
@ApiProperty({example:'52.332332',description:'координаты долгота'})
@Column({type:DataType.STRING,defaultValue:false})
lon:number

}