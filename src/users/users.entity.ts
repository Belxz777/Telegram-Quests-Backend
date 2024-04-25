import { ApiProperty } from '@nestjs/swagger'
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm"

@Entity({name:'kalashnikov-employees'})
export class User {
    @ApiProperty({example:213,description:'айди'})
    @PrimaryGeneratedColumn()
 id:number
// мы это делаем для визуализвации эндпоинта что бы видеть что приходит на этот реквест
    @ApiProperty({example:"Иван",description:'имя'})
    @Column()
 firstname:string
    @ApiProperty({example:"Иванов",description:'фамилия'})
    @Column()
lastname:string
    @ApiProperty({example:"программист-1с",description:'должность'})
    @Column()
position:string
    @ApiProperty({example:21,description:'возраст'})
    @Column()
age:number
@Column()
    @ApiProperty({example:"krokodile323",description:'логин'})
login:string
@Column()
    @ApiProperty({example:"a1234dfc$",description:'пароль'})
password:string
@Column('simple-array', {nullable: true})
boards:string[]
}