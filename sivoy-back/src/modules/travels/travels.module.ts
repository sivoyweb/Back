import { Module } from '@nestjs/common';
import { TravelsController } from './travels.controller';
import { TravelsService } from './travels.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Travel } from 'src/entities/travel.entity';
import { TravelsRepository } from './travels.repository';
import { Review } from 'src/entities/review.entity';
import { UsersModule } from '../users/users.module';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Travel, Review, User]), UsersModule],
  controllers: [TravelsController],
  providers: [TravelsService, TravelsRepository],
})
export class TravelsModule {}
