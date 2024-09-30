import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Disability } from 'src/entities/disabilities.entity';
import { DisabilitiesController } from './disabilities.controller';
import { DisabilitiesService } from './disabilities.service';
import { DisabilitiesRepository } from './disabilities.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Disability]),
    forwardRef(() => UsersModule),
  ],
  controllers: [DisabilitiesController],
  providers: [DisabilitiesService, DisabilitiesRepository],
  exports: [DisabilitiesService, DisabilitiesRepository],
})
export class DisabilitiesModule {}
