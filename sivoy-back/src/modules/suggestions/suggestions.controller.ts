import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SuggestionsService } from './suggestions.service';
import { ApiTags } from '@nestjs/swagger';
import { Suggestion } from 'src/entities/suggestion.entity';
import { CreateTravelDto } from '../travels/travels.dto';
import { ReadGuard } from 'src/guards/read.guard';
import { Request } from 'express';
import { CreateSuggestionDto } from './suggestions.dto';

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
  @UseGuards(ReadGuard)
  createSuggestion(
    @Body() suggestion: CreateSuggestionDto,
    @Req() req: Request,
  ) {
    const userId = req.user.id;
    return this.suggestionsService.createSuggestion(suggestion, userId);
  }

  @Put(':id')
  updateState(@Param('id') id: string) {
    return this.suggestionsService.updateState(id);
  }
}
