import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('teams')
export class Team {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Супер', description: 'название комнаты' })
    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column('simple-array', { nullable: true, default: [] })
    solved: string[];

    @Column('simple-array', { nullable: true, default: [] })
    results: string[];

    @Column('simple-array', { nullable: true, default: [] })
    imageDataUrl: string[];
}