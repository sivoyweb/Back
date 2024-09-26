import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Travel } from './travel.entity';
import { v4 as uuid } from 'uuid';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @ManyToOne(() => Travel, (travel) => travel.reviews)
  travel: Travel;

  @Column({ type: 'varchar', length: 255 })
  review: string;

  @Column({ type: 'int' })
  stars: number;

  @CreateDateColumn({ type: 'date' })
  date: Date;

  @Column({ default: true })
  visible: boolean;
}
