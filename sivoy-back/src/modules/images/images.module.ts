import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { ImagesRepository } from './images.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from 'src/entities/images.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Image]), UsersModule],
  controllers: [ImagesController],
  providers: [ImagesService, ImagesRepository],
  exports: [ImagesRepository],
})
export class ImagesModule {}
