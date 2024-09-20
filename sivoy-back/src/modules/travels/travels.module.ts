import { Module } from '@nestjs/common';
import { TravelsController } from './travels.controller';
import { TravelsService } from './travels.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Travel } from 'src/entities/travel.entity';
import { TravelsRepository } from './travels.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Travel])],
  controllers: [TravelsController],
  providers: [TravelsService, TravelsRepository],
})
export class TravelsModule {}
