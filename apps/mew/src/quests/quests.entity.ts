import { ApiProperty } from '@nestjs/swagger'
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Quest {
    @ApiProperty({ example: 1, description: 'айди вопроса' })
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({ example: '', description: '' })
    @Column({ nullable: true })
    question: string

    @ApiProperty({ example: 'Боксер', description: 'правильный ответ' })
    @Column({ default: '' })
    answer: string

    @ApiProperty({ example: ["",""], description: 'Массив вариантов' })
    @Column('simple-array', { nullable: true, default: ',' })
    variants: string[]

    @ApiProperty({ example: '55.00323', description: 'координаты широта' })
    @Column({ type: 'varchar', nullable: false })
    lat: number

    @ApiProperty({ example: '52.332332', description: 'координаты долгота' })
    @Column({ type: 'varchar', nullable: false })
    lon: number

    @ApiProperty({ example: 'Roman', description: 'автор теста' })
    @Column({ type: 'varchar', nullable: true })
    author: string

    @ApiProperty({ example: 'Смешарики', description: 'все тесты в одном квизе' })
    @Column({ type: 'varchar', nullable: false })
    quizIn: string

    @ApiProperty({ example: 1, description: 'айди квиза' })
    @Column({ type: 'int', nullable: false })
    quizId: number

    @ApiProperty({ example: 'История', description: 'Категория теста' })
    @Column({ type: 'varchar', nullable: false })
    categorie: string

    @Column({ type: 'varchar', default: '', nullable: true })
    image: string

    @Column({ type: 'boolean', nullable: true })
    rebus: boolean

    @Column({ type: 'boolean', default: false })
    todo: boolean
}