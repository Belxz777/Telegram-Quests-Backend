import { ApiProperty } from '@nestjs/swagger'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class CreateQuestDto {
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({ example: 'Кто является главным героем фильма Уран', description: 'вопрос' })
    @Column({ type: 'varchar', nullable: true })
    question: string

    @ApiProperty({ example: 'Боксер', description: 'правильный ответ' })
    @Column({ type: 'varchar', nullable: false })
    answer: string

    @ApiProperty({ example: ['Клоун', 'Бизнессмен', 'Heудачник'], description: 'Массив вариантов' })
    @Column('simple-array', { nullable: true })
    variants: string[]

    @ApiProperty({ example: 'easy', description: 'сложность' })
    @Column({ type: 'varchar' })
    hardness: string

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
    @Column({ type: 'varchar' })
    quizIn: string

    @ApiProperty({ example: 1, description: 'айди квиза' })
    @Column({ type: 'int', nullable: false })
    quizId: number

    @ApiProperty({ example: 'История', description: 'Категория теста' })
    @Column({ type: 'varchar' })
    categorie: string

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

    @ApiProperty({ example: 'Кто является главным героем фильма Уран', description: 'вопрос' })
    @Column({ type: 'varchar', nullable: false })
    question: string

    @ApiProperty({ example: 'Боксер', description: 'правильный ответ' })
    @Column({ type: 'varchar' })
    answer: string

    @ApiProperty({ example: ['Клоун', 'Бизнессмен', 'Heудачник'], description: 'Массив вариантов' })
    @Column('simple-array')
    variants: string[]

    @ApiProperty({ example: 'easy', description: 'сложность' })
    @Column({ type: 'varchar' })
    hardness: string

    @ApiProperty({ example: '55.00323', description: 'координаты широта' })
    @Column({ type: 'varchar' })
    lat: number

    @ApiProperty({ example: '52.332332', description: 'координаты долгота' })
    @Column({ type: 'varchar' })
    lon: number

    @ApiProperty({ example: 'Roman', description: 'автор теста' })
    @Column({ type: 'varchar' })
    author: string

    @ApiProperty({ example: 'Смешарики', description: 'все тесты в одном квизе' })
    @Column({ type: 'varchar' })
    quizIn: string

    @ApiProperty({ example: 'История', description: 'Категория теста' })
    @Column({ type: 'varchar' })
    categorie: string
}