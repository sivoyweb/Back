import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Travel } from './travel.entity';
import { Suggestion } from './suggestion.entity';

@Entity('providers')
export class Provider {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ default: true })
  visible: boolean;

  @OneToMany(() => Travel, (travel) => travel.provider)
  travels: Travel[];

  @OneToMany(() => Suggestion, (suggestion) => suggestion.provider)
  suggestion: Suggestion[];
}
