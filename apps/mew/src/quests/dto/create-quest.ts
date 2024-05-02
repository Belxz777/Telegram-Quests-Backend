import { ApiProperty } from '@nestjs/swagger'
import {Table,Column, DataType,Model, AllowNull} from 'sequelize-typescript'

export class CreateQuestDto {
    @ApiProperty({example:'Кто является главным героем фильма Уран',description:'вопрос'})
    @Column({type:DataType.STRING,allowNull:true})
    question:string
    @ApiProperty({example:'Боксер',description:'правильный ответ'})
    @Column({type:DataType.STRING,defaultValue:false,allowNull:false})
answer:string
@ApiProperty({example:['Клоун','Бизнессмен','Heудачник'],description:'Массив вариантов'})
@Column({type:DataType.ARRAY(DataType.STRING),defaultValue:['',''],allowNull:true})
variants:[]
@ApiProperty({example:'easy',description:'сложность'})
@Column({type:DataType.STRING,defaultValue:false})
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
@Column({type:DataType.STRING,defaultValue:false})
quizIn:string
@ApiProperty({example:'История',description:'Категория теста'})
@Column({type:DataType.STRING,defaultValue:false})
categorie:string
@Column({type:DataType.STRING,defaultValue:"",allowNull:true})
image:string
@Column({type:DataType.BOOLEAN,defaultValue:false})
rebus:boolean
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
@ApiProperty({example:'easy',description:'сложность'})
@Column({type:DataType.STRING,defaultValue:false})
hardness:string
@ApiProperty({example:'55.00323',description:'координаты широта'})
@Column({type:DataType.STRING,defaultValue:false})
lat:number
@ApiProperty({example:'52.332332',description:'координаты долгота'})
@Column({type:DataType.STRING,defaultValue:false})
lon:number
@ApiProperty({example:'Roman',description:'автор теста'})
@Column({type:DataType.STRING,defaultValue:false})
author:string
@ApiProperty({example:'Смешарики',description:'все тесты в одном квизе'})
@Column({type:DataType.STRING,defaultValue:false})
quizIn:string
@ApiProperty({example:'История',description:'Категория теста'})
@Column({type:DataType.STRING,defaultValue:false})
categorie:string


}