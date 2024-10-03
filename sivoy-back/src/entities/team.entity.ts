import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('team')
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  description: string;

  @Column({ nullable: true })
  linkedin: string;

  @Column({ default: true })
  visible: boolean;
}

