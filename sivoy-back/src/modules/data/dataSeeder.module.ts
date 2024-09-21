import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Disability } from 'src/entities/disabilities.entity';
import { DataSeederService } from './dataSeeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Disability])],
  providers: [DataSeederService, Disability],
})
export class DataSeederModule {}
