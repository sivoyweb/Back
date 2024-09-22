import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { User } from './user.entity';
import { v4 as uuid } from 'uuid';
import { Image } from './images.entity';

@Entity('suggestions')
export class Suggestion {
  @PrimaryGeneratedColumn()
  id: string = uuid();

  @ManyToOne(() => User, (user) => user.suggestions)
  user: User;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  country: string;

  @Column({ type: 'varchar', length: 255 })
  city: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  typeService: string;

  @Column({ type: 'varchar', length: 255 })
  accesibilitySeal: string;

  @OneToMany(() => Image, (image) => image.suggestion)
  @JoinTable()
  imagesUrl: Image[];

  @Column({ type: 'boolean', default: false })
  state: boolean;
}
