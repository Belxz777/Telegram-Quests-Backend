import { ApiProperty } from '@nestjs/swagger'
import {Table,Column, DataType,Model, AllowNull} from 'sequelize-typescript'

export class CreateTeamDto {
    @Column({type:DataType.STRING,allowNull:false})
    name:string
}