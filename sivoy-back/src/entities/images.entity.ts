import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Suggestion } from './suggestion.entity';
import { v4 as uuid } from 'uuid';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', length: 255 })
  url: string;

  @Column({ type: 'varchar', length: 255 })
  publicId: string;

  @ManyToOne(() => Suggestion, (suggestion) => suggestion.imagesUrl)
  suggestion: Suggestion;
}
