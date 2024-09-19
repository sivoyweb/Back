import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Credential } from './credential.entity';
import { Review } from './review.entity';
import { Donation } from './donation.entity';
import { Suggestion } from './suggestion.entity';
import { Travel } from './travel.entity';
import { Role } from 'src/helpers/roles.enum.';
import { Disability } from './disabilities.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ default: Role.User })
  role: Role;

  @OneToMany(() => Disability, (disability) => disability)
  @JoinTable()
  disabilities: Disability[];

  @Column()
  Phone: number;

  @Column({ type: 'date' })
  createdAt: Date;

  @ManyToOne(() => Credential, (credential) => credential.id)
  @JoinTable()
  credential: Credential;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Donation, (donation) => donation.user)
  donations: Donation[];

  @OneToMany(() => Suggestion, (suggestion) => suggestion.id)
  suggestions: Suggestion[];

  @OneToMany(() => Travel, (travel) => travel.id)
  history: Travel[];

  @Column({ type: 'boolean', default: false })
  block: boolean;
}
