import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Disability } from 'src/entities/disabilities.entity';
import { DataSeederService } from './dataSeeder.service';
import { Travel } from 'src/entities/travel.entity';
import { Image } from 'src/entities/images.entity';
import { Promotion } from 'src/entities/promotion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Disability, Travel, Image, Promotion])],
  providers: [DataSeederService],
})
export class DataSeederModule {}
