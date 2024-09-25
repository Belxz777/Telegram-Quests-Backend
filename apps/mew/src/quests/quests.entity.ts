import { Entity, PrimaryGeneratedColumn, Column, Table } from 'typeorm'

@Entity("quest-db")
export class Quest {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    question: string

    @Column({ default: '',nullable:true })
    answer: string

    @Column('simple-array', { nullable: true, default: ' ' })
    variants: string[]
/*
{
!question:"Вопрос",
*answer:"Ответ на вопрос(не заполнять если todo)"),
*variants (не заполнять если todo и variants):[
"Варианты ответа(",
"..."
],
!lat:"Широта",
!lon:"Долгота",
!quizIn:"Имя квеста(нужно если несколько вопросов в одном)",
!quizId:"Айди квеста",
*image:"url ",
*rebus:"true если есть картинка,  а так не заполнять и image тоже",
*todo:"true тогда не надо ничего из этого просто question"
}
 */
    @Column({ type: 'varchar', nullable: true })
    lat: number

    @Column({ type: 'varchar', nullable: true})
    lon: number

    @Column({ type: 'varchar', nullable: true })
    quizIn: string

    @Column({ type: 'int', nullable: true })
    quizId: number

    @Column({ type: 'varchar', default: '', nullable: true })
    image: string

    @Column({ type: 'boolean', nullable: true,default:false })
    rebus: boolean

    @Column({ type: 'boolean', default: false,nullable:true })
    todo: boolean
}