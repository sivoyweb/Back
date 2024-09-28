import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Suggestion } from 'src/entities/suggestion.entity';
import { SuggestionState } from 'src/helpers/suggestionState.enum';
import { Repository } from 'typeorm';

@Injectable()
export class SuggestionsRepository {
  constructor(
    @InjectRepository(Suggestion)
    private readonly SuggestionsRepository: Repository<Suggestion>,
  ) {}

  async getPendingSuggestions() {
    return this.SuggestionsRepository.find({
      where: { state: SuggestionState.PENDING },
    });
  }

  async getSuggestionById(id: string): Promise<Suggestion> {
    const suggestion = await this.SuggestionsRepository.findOne({
      where: { id },
    });

    if (!suggestion) {
      throw new NotFoundException(`Suggestion with ID ${id} not found`);
    }

    return suggestion;
  }

  createSuggestion() {
    return 'Suggestion Created';
  }

  updateState(id: string) {
    return 'Suggestion Updated';
  }
}
