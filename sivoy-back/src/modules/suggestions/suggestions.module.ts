import { Module } from '@nestjs/common';
import { SuggestionsController } from './suggestions.controller';
import { SuggestionsService } from './suggestions.service';
import { SuggestionsRepository } from './suggestions.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suggestion } from 'src/entities/suggestion.entity';
import { TravelsModule } from '../travels/travels.module';
import { Travel } from 'src/entities/travel.entity';
import { UsersModule } from '../users/users.module';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Suggestion, Travel, User]), UsersModule],
  controllers: [SuggestionsController],
  providers: [SuggestionsService, SuggestionsRepository],
  exports: [SuggestionsRepository],
})
export class SuggestionsModule {}
