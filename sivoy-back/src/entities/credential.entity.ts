import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { v4 as uuid } from 'uuid';
import { Image } from './images.entity';

@Entity('credentials')
export class Credential {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'date', nullable: true })
  resetPasswordExpiration: Date;

  @Column({ type: 'varchar', nullable: true })
  resetPasswordCode: string;

  @OneToOne(() => Image, { cascade: true })
  @JoinColumn()
  avatar: Image;

  @OneToOne(() => User, (user) => user.credential)
  user: User;
}
