import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './user.entity';

@Entity('disabilities')
export class Disability {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @Column()
  category: string;

  @ManyToOne(() => User, (user) => user.disabilities)
  user: User;
}
