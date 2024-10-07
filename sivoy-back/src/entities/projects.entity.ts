import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  description: string;

  @Column({ default: true })
  visible: boolean;
}
