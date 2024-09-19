import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { Review } from './review.entity';
import { TravelProvider } from './travelProvider.entity';
import { v4 as uuid } from 'uuid';
import { Image } from './images.entity';

@Entity('travels')
export class Travel {
  @PrimaryGeneratedColumn()
  id: string = uuid();

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  country: string;

  @Column({ type: 'varchar', length: 255 })
  city: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  serviceType: string;

  @Column({ type: 'varchar', length: 255 })
  accesibilitySeal: string;

  @OneToMany(() => Review, (review) => review.travel)
  reviews: Review[];

  @OneToMany(() => Image, (image) => image.travel)
  @JoinTable()
  images: Image[];

  @Column({ type: 'int' })
  stars: number;

  @ManyToOne(() => TravelProvider, (travelProvider) => travelProvider.provider)
  provider: TravelProvider;
}
