import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Disability } from 'src/entities/disabilities.entity';
import { DisabilitiesController } from './disabilities.controller';
import { DisabilitiesService } from './disabilities.service';
import { DisabilitiesRepository } from './disabilities.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Disability])],
  controllers: [DisabilitiesController],
  providers: [DisabilitiesService, DisabilitiesRepository],
})
export class DisabilitiesModule {}
