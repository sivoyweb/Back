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
import { Provider } from './provider.entity';
import { ApprovalState } from 'src/helpers/ApprovalState.enum';

@Entity('suggestions')
export class Suggestion {
  @PrimaryGeneratedColumn('uuid')
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

  @Column({ type: 'varchar', length: 500 })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  typeService: string;

  @OneToMany(() => Image, (image) => image.suggestion)
  @JoinTable()
  images: Image[];

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

  @Column({ type: 'enum', enum: ApprovalState, default: ApprovalState.PENDING })
  state: ApprovalState;
}
