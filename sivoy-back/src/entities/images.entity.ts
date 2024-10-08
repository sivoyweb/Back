import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Suggestion } from './suggestion.entity';
import { v4 as uuid } from 'uuid';
import { Travel } from './travel.entity';
import { Credential } from './credential.entity';
import { Blog } from './blogs.entity';
import { Promotion } from './promotion.entity';
import { Team } from './team.entity';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', length: 255, default: 'URL default' })
  url: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: 'public id default',
    unique: false,
  })
  publicId: string;

  @Column({ type: 'varchar', nullable: true })
  alt: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @ManyToOne(() => Suggestion, (suggestion) => suggestion.images)
  suggestion: Suggestion;

  @ManyToOne(() => Travel, (travel) => travel.accesibilitySeal)
  accesibilitySeal: Travel;

  @ManyToOne(() => Travel, (travel) => travel.images)
  travel: Travel;

  @ManyToOne(() => Blog, (blog) => blog.images, { onDelete: 'CASCADE' })
  blog: Blog;

  @ManyToOne(() => Promotion, (promotion) => promotion.images)
  promotion: Promotion;

  @OneToMany(() => Credential, (credential) => credential.avatar)
  avatarUser: Credential;

  @OneToOne(() => Team, (team) => team.image)
  team: Team;
}
