import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Image } from './images.entity';

@Entity('alliances')
export class Alliance {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ length: 255 })
  name: string;

  @OneToOne(() => Image, { cascade: true })
  @JoinColumn()
  image: Image;

  @Column({ type: 'varchar', length: 255 })
  url: string;

  @Column({ default: true })
  visible: boolean;
}
