import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Travel } from './travel.entity';
import { v4 as uuid } from 'uuid';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id: string = uuid();

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @ManyToOne(() => Travel, (travel) => travel.reviews)
  travel: Travel;

  @Column({ type: 'varchar', length: 255 })
  review: string;

  @Column({ type: 'int' })
  stars: number;
}
