import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
  ManyToMany,
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

  @ManyToMany(() => Disability, (disability) => disability.users)
  @JoinTable()
  disabilities: Disability[];

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'date' })
  createdAt: Date;

  @Column({ type: 'boolean', default: false })
  auth: boolean;

  @OneToOne(() => Credential, (credential) => credential.id, {
    cascade: true,
  })
  @JoinColumn()
  credential: Credential;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Donation, (donation) => donation.user)
  donations: Donation[];

  @OneToMany(() => Suggestion, (suggestion) => suggestion.user)
  suggestions: Suggestion[];

  @OneToMany(() => Travel, (travel) => travel.userHistory)
  history: Travel[];

  @Column({ type: 'boolean', default: false })
  block: boolean;
}
