import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { v4 as uuid } from 'uuid';
import { Image } from './images.entity';

@Entity('credentials')
export class Credential {
  @PrimaryGeneratedColumn()
  id: string = uuid();

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @OneToMany(() => Image, (image) => image)
  avatar: Image;

  @OneToOne(() => User, (user) => user.credential)
  user: User;
}
