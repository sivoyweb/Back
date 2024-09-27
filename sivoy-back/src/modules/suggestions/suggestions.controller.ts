import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { SuggestionsService } from './suggestions.service';
import { ApiTags } from '@nestjs/swagger';
import { Suggestion } from 'src/entities/suggestion.entity';

@ApiTags(`Suggestions`)
@Controller('suggestions')
export class SuggestionsController {
  constructor(private readonly suggestionsService: SuggestionsService) {}

  @Get('pending')
  getPendingSuggestions(): Promise<Suggestion[]> {
    return this.suggestionsService.getPendingSuggestions();
  }

  @Get(':id')
  getSuggestionById(@Param('id') id: string) {
    return this.suggestionsService.getSuggestionById(id);
  }

  @Post()
  createSuggestion() {
    return this.suggestionsService.createSuggestion();
  }

  @Put(':id')
  updateState(@Param('id') id: string) {
    return this.suggestionsService.updateState(id);
  }
}
