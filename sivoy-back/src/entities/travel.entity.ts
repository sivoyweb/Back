import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { Review } from './review.entity';
import { v4 as uuid } from 'uuid';
import { Image } from './images.entity';
import { User } from './user.entity';
import { Provider } from './provider.entity';

@Entity('travels')
export class Travel {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  country: string;

  @Column({ type: 'varchar', length: 255 })
  city: string;

  @Column({ type: 'timestamp' })
  date: Date;

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

  @ManyToOne(() => Provider, (provider) => provider.travels)
  provider: Provider;

  @Column({ type: 'varchar', length: 255 })
  website: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'varchar', length: 255 })
  openingHours: string;

  @OneToMany(() => User, (user) => user.history)
  userHistory: User;

  @Column({ type: 'boolean', default: true })
  available: boolean;
}
