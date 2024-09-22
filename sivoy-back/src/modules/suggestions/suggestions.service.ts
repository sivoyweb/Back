import { Injectable } from '@nestjs/common';
import { SuggestionsRepository } from './suggestions.repository';

@Injectable()
export class SuggestionsService {
  constructor(private readonly SuggestionsRepository: SuggestionsRepository) {}

  getAllSuggestions() {
    return this.SuggestionsRepository.getAllSuggestions();
  }

  getSuggestionById(id: string) {
    return this.SuggestionsRepository.getSuggestionById(id);
  }

  createSuggestion() {
    return this.SuggestionsRepository.createSuggestion();
  }

  updateState(id: string) {
    return this.SuggestionsRepository.updateState(id);
  }
}
