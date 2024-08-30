import { Column } from 'typeorm'


export class CreateTeamDto {
    @Column({nullable:false})
    name:string
}