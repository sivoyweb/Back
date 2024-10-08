import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Suggestion } from 'src/entities/suggestion.entity';
import { ApprovalState } from 'src/helpers/ApprovalState.enum';
import { Repository } from 'typeorm';
import { CreateTravelDto } from '../travels/travels.dto';
import { Travel } from 'src/entities/travel.entity';
import { CreateSuggestionDto, UpdateSuggestionDto } from './suggestions.dto';

@Injectable()
export class SuggestionsRepository {
  constructor(
    @InjectRepository(Suggestion)
    private readonly SuggestionsRepository: Repository<Suggestion>,
    @InjectRepository(Travel)
    private readonly TravelsRepository: Repository<Travel>,
  ) {}

  async getPendingSuggestions() {
    return this.SuggestionsRepository.find({
      where: { state: ApprovalState.PENDING },
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

  async createSuggestion(suggestion: CreateSuggestionDto, userId) {
    const existingTravel = await this.TravelsRepository.findOne({
      where: { website: suggestion.website },
    });
    if (existingTravel) {
      throw new BadRequestException(
        `A travel with the name '${suggestion.name}' already exists.`,
      );
    }
    const existingSuggestion = await this.SuggestionsRepository.findOne({
      where: { website: suggestion.website },
    });
    if (
      existingSuggestion &&
      existingSuggestion.state === ApprovalState.PENDING
    ) {
      throw new BadRequestException(
        `A suggestion with the name '${suggestion.name}' already exists and is pending.`,
      );
    }

    suggestion.userId = userId;
    const newSuggestion = this.SuggestionsRepository.create(suggestion);
    try {
      return await this.SuggestionsRepository.save(newSuggestion);
    } catch (error) {
      throw new BadRequestException(`Error creating travel: ${error.message}`);
    }
  }

  async updateSuggestion(id: string, suggestion: UpdateSuggestionDto) {
    const updateSuggestion = await this.SuggestionsRepository.findOneBy({ id });
    if (!updateSuggestion)
      throw new NotFoundException(`suggestion whit ${id} not found`);
    await this.SuggestionsRepository.update(id, suggestion);
    return suggestion;
  }

  async updateApprovalState(id: string, ApprovalState: ApprovalState) {
    const suggestion = await this.SuggestionsRepository.findOne({
      where: { id },
    });
    if (!suggestion) {
      throw new NotFoundException(`Suggestion with ID ${id} not found`);
    }
    suggestion.state = ApprovalState;
    await this.SuggestionsRepository.save(suggestion);

    // const email = suggestion.user.credential.email;
    // if (ApprovalState === ApprovalState.APPROVED) {
    // // enviar mail aprobado
    // } else if (ApprovalState === ApprovalState.REJECTED) {
    // // enviar mail rechazado
    // }
    return suggestion;
  }
  
}
