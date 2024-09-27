import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Suggestion } from './suggestion.entity';
import { v4 as uuid } from 'uuid';
import { Travel } from './travel.entity';
import { Credential } from './credential.entity';
import { Blog } from './blogs.entity';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', length: 255, default: 'URL default' })
  url: string;

  @Column({ type: 'varchar', length: 255, default: 'public id default' })
  publicId: string;

  @ManyToOne(() => Suggestion, (suggestion) => suggestion.images)
  suggestion: Suggestion;

  @ManyToOne(() => Travel, (travel) => travel.images)
  travel: Travel;

  @ManyToOne(() => Credential, (credential) => credential.avatar)
  avatarUser: Credential;

  @ManyToOne(() => Blog, (blog) => blog.images, { onDelete: 'CASCADE' })
  blog: Blog;
}
