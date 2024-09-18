import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Travel } from './travel.entity';
import { Provider } from './provider.entity';
import { v4 as uuid } from 'uuid';

@Entity('travels_providers')
export class TravelProvider {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @ManyToOne(() => Travel, (travel) => travel.id)
  travel: Travel;

  @ManyToOne(() => Provider, (provider) => provider.id)
  provider: Provider;
}
