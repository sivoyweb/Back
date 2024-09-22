import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Disability } from 'src/entities/disabilities.entity';
import { DataSeederService } from './dataSeeder.service';
import { Travel } from 'src/entities/travel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Disability, Travel])],
  providers: [DataSeederService, Disability, Travel],
})
export class DataSeederModule {}
