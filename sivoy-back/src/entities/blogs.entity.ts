import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Image } from './images.entity';

@Entity('blogs')
export class Blog {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ length: 255 })
  title: string;

  @Column('text')
  content: string;

  @OneToMany(() => Image, (images) => images.blog, { cascade: true })
  images: Image[];

  @CreateDateColumn({ type: 'date' }) 
  date: string;

  @Column({ default: true })
  visible: boolean;
}
