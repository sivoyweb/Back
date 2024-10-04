import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { v4 as uuid } from 'uuid';
import { DonationStatus } from 'src/helpers/roles.enum.';

@Entity('donations')
export class Donation {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @ManyToOne(() => User, (user) => user.donations)
  user: User;

  @Column({ type: 'int' })
  amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  status: DonationStatus;
}
