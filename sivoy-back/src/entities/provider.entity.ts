import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TravelProvider } from './travelProvider.entity';
import { v4 as uuid } from 'uuid';

@Entity('providers')
export class Provider {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @OneToMany(() => TravelProvider, (travelProvider) => travelProvider.provider)
  travelProviders: TravelProvider[];
}
