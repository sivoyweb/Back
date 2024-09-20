import { Module } from '@nestjs/common';
import { SuggestionsController } from './suggestions.controller';
import { SuggestionsService } from './suggestions.service';
import { SuggestionsRepository } from './suggestions.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suggestion } from 'src/entities/suggestion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Suggestion])],
  controllers: [SuggestionsController],
  providers: [SuggestionsService, SuggestionsRepository],
})
export class SuggestionsModule {}
