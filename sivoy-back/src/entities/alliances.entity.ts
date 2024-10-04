import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
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
    images: Image[];
  
    @CreateDateColumn({ type: 'date' })
    date: Date;
  
    @Column({ default: true })
    visible: boolean;
  }