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
import { ServiceType } from 'src/helpers/serviceType.enum';
import { AccessibilitySealName } from 'src/helpers/accessibilitySealName.enum';

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

  @Column({ type: 'varchar', length: 500 })
  description: string;

  @Column({
    type: 'enum',
    enum: ServiceType,
    default: ServiceType.Other,
  })
  serviceType: ServiceType;

  @Column({
    type: 'enum',
    enum: AccessibilitySealName,
    nullable: true,
  })
  accessibilitySealName: AccessibilitySealName;

  @OneToMany(() => Image, (image) => image.accesibilitySeal, { cascade: true })
  @JoinTable()
  accesibilitySeal: Image[];

  @OneToMany(() => Review, (review) => review.travel)
  reviews: Review[];

  @OneToMany(() => Image, (image) => image.travel, { cascade: true })
  @JoinTable()
  images: Image[];

  @Column({ type: 'float', default: 0 })
  averageStars: number;

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
