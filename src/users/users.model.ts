import { ApiProperty } from '@nestjs/swagger'
import {Table,Column, DataType,Model} from 'sequelize-typescript'

@Table({tableName:'new-user'})
//модель нашей базы данных для взамиомдействия с ней
export class User extends Model<User> {
   
// мы это делаем для визуализвации эндпоинта что бы видеть что приходит на этот реквест
    @ApiProperty({example:1,description:'код зека'})
    @Column({type:DataType.INTEGER,unique:true,autoIncrement:true,primaryKey:true,allowNull:false})
    code:number
    @ApiProperty({example:"Ivan",description:'имя'})
    @Column({type:DataType.STRING,allowNull:false})
    clichka:string
    @ApiProperty({example:12,description:'возвраст'})
    @Column({type:DataType.INTEGER,allowNull:false})
    age:number
    @ApiProperty({example:false,description:'статус'})
    @Column({type:DataType.BOOLEAN,defaultValue:false})
zakonik:boolean
}