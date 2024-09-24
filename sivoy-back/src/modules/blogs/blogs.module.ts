import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { Blog } from 'src/entities/blogs.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsRepository } from './blogs.repository';
import { Image } from 'src/entities/images.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, Image])],
  controllers: [BlogsController],
  providers: [BlogsService, BlogsRepository]
})
export class BlogsModule {}
