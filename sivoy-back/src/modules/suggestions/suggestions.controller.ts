import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { SuggestionsService } from './suggestions.service';

@Controller('suggestions')
export class SuggestionsController {
  constructor(private readonly suggestionsService: SuggestionsService) {}

  @Get()
  getAllSuggestions() {
    return this.suggestionsService.getAllSuggestions();
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
