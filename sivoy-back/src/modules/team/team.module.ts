import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { TeamRepository } from './team.repository';
import { Team } from 'src/entities/team.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { Image } from 'src/entities/images.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, Image]), UsersModule],
  controllers: [TeamController],
  providers: [TeamService, TeamRepository],
  exports: [TeamRepository],
})
export class TeamModule {}
