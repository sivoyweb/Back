import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { v4 as uuid } from 'uuid';

@Entity('credentials')
export class Credential {
  @PrimaryGeneratedColumn()
  id: string = uuid();

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar: string;

  @OneToOne(() => User, (user) => user.credential)
  user: User;
}
