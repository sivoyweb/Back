import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Review } from './review.entity';
import { TravelProvider } from './travelProvider.entity';
import { v4 as uuid } from 'uuid';

@Entity('travels')
export class Travel {
  @PrimaryGeneratedColumn()
  id: string = uuid();

  @Column({ type: 'varchar', length: 255 })
  destiny: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  typeService: string;

  @Column({ type: 'varchar', length: 255 })
  accesibilitySeal: string;

  @OneToMany(() => Review, (review) => review.travel)
  reviews: Review[];

  @Column({ type: 'simple-array', nullable: true })
  imagesUrl: string[];

  @Column({ type: 'int' })
  stars: number;

  @ManyToOne(() => TravelProvider, (travelProvider) => travelProvider.provider)
  provider: TravelProvider;
}
