import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Travel } from './travel.entity';
import { v4 as uuid } from 'uuid';

@Entity('promotions')
export class Promotion {
  @PrimaryGeneratedColumn()
  id: string = uuid();

  @ManyToOne(() => Travel, (travel) => travel.id)
  travel: Travel;

  @Column({ type: 'int' })
  discount: number;

  @Column()
  validUntil: Date;
}
