import { Injectable } from '@nestjs/common';
import { SuggestionsRepository } from './suggestions.repository';
import { CreateTravelDto } from '../travels/travels.dto';
import { CreateSuggestionDto } from './suggestions.dto';

@Injectable()
export class SuggestionsService {
  constructor(private readonly SuggestionsRepository: SuggestionsRepository) {}

  getPendingSuggestions() {
    return this.SuggestionsRepository.getPendingSuggestions();
  }

  getSuggestionById(id: string) {
    return this.SuggestionsRepository.getSuggestionById(id);
  }

  createSuggestion(suggestion: CreateSuggestionDto, userId) {
    return this.SuggestionsRepository.createSuggestion(suggestion, userId);
  }

  updateState(id: string) {
    return this.SuggestionsRepository.updateState(id);
  }
}
