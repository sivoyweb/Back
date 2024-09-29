import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Suggestion } from 'src/entities/suggestion.entity';
import { SuggestionState } from 'src/helpers/suggestionState.enum';
import { Repository } from 'typeorm';
import { CreateTravelDto } from '../travels/travels.dto';
import { Travel } from 'src/entities/travel.entity';
import { CreateSuggestionDto } from './suggestions.dto';

@Injectable()
export class SuggestionsRepository {
  constructor(
    @InjectRepository(Suggestion)
    private readonly SuggestionsRepository: Repository<Suggestion>,
    @InjectRepository(Travel) private readonly TravelsRepository: Repository<Travel>,
  ) {}

  async getPendingSuggestions() {
    return this.SuggestionsRepository.find({
      where: { state: SuggestionState.PENDING },
    });
  }

  async getSuggestionById(id: string): Promise<Suggestion> {
    const suggestion = await this.SuggestionsRepository.findOne({ where: { id } });

    if (!suggestion) {
      throw new NotFoundException(`Suggestion with ID ${id} not found`);
    }

    return suggestion;
  }

  async createSuggestion(suggestion:CreateSuggestionDto, userId) {
    const existingTravel = await this.TravelsRepository.findOne({ where: { website: suggestion.website } });
    if (existingTravel) {
      throw new BadRequestException(`A travel with the name '${suggestion.name}' already exists.`);
    }
    const existingSuggestion = await this.SuggestionsRepository.findOne({ where: { website: suggestion.website } });
    if (existingSuggestion && existingSuggestion.state === SuggestionState.PENDING) {
      throw new BadRequestException(`A suggestion with the name '${suggestion.name}' already exists and is pending.`);
    }

    suggestion.userId = userId
    const newSuggestion = this.SuggestionsRepository.create(suggestion);
    try {
      return await this.SuggestionsRepository.save(newSuggestion);
    } catch (error) {
      throw new BadRequestException(`Error creating travel: ${error.message}`);
    }
  }

  updateState(id: string) {
    return 'Suggestion Updated';
  }
}
