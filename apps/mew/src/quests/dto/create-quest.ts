import { ApiProperty } from '@nestjs/swagger'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class CreateQuestDto {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', nullable: true })
    question: string


    @Column({ type: 'varchar', nullable: false })
    answer?: string 


    @Column('simple-array', { nullable: true })
    variants: any[]



    @Column({ type: 'varchar', nullable: false })
    lat: number


    @Column({ type: 'varchar', nullable: false })
    lon: number


    @Column({ type: 'varchar' })
    quizIn: string


    @Column({ type: 'int', nullable: false })
    quizId: number

    @Column({ type: 'varchar', nullable: true })
    image: string

    @Column({ type: 'boolean', default: false })
    rebus: boolean

    @Column({ type: 'boolean', default: false })
    todo: boolean
}

@Entity()
export class UpdateQuestDto {
    @PrimaryGeneratedColumn()
    id: number


    @Column({ type: 'varchar', nullable: false })
    question: string


    @Column({ type: 'varchar' })
    answer: string


    @Column('simple-array')
    variants: string[]


    @Column({ type: 'varchar' })
    hardness: string


    @Column({ type: 'varchar' })
    lat: number


    @Column({ type: 'varchar' })
    lon: number


    @Column({ type: 'varchar' })
    author: string

    @Column({ type: 'varchar' })
    quizIn: string

}