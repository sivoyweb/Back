import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
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

  @Column({ default: true })
  active: boolean;

  @ManyToMany(() => User, (user) => user.disabilities)
  users: User[];
}
