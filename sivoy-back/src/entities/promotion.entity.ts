import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Image } from './images.entity';

@Entity('promotions')
export class Promotion {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'date'  })
  validFrom: Date;

  @Column({ type: 'date'  })
  validUntil: Date;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Image, (image) => image.promotion, { cascade: true })
  images: Image[];
}
