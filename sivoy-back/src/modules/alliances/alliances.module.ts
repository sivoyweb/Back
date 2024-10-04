import { Module } from '@nestjs/common';
import { AlliancesController } from './alliances.controller';
import { AlliancesService } from './alliances.service';
import { AlliancesRepository } from './alliances.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alliance } from 'src/entities/alliances.entity';
import { Image } from 'src/entities/images.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Alliance, Image]), UsersModule],
  controllers: [AlliancesController],
  providers: [AlliancesService, AlliancesRepository]
})
export class AlliancesModule {}
