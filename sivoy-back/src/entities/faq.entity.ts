import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity('faq')
export class Faq {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({ length: 255} )
    question: string;

    @Column('text')
    answer: string;

    @Column({ default: true })
    visible: boolean
}