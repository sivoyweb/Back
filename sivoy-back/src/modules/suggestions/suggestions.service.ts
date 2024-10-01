import { Injectable } from '@nestjs/common';
import { SuggestionsRepository } from './suggestions.repository';
import { CreateTravelDto } from '../travels/travels.dto';
import { CreateSuggestionDto } from './suggestions.dto';
import { SuggestionState } from 'src/helpers/suggestionState.enum';

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

  updateSuggestionState(id: string, suggestionState: SuggestionState) {
    return this.SuggestionsRepository.updateSuggestionState(id, suggestionState);
  }
}
