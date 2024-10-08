import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
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
import { CreateSuggestionDto, UpdateSuggestionDto } from './suggestions.dto';
import { ApprovalState } from 'src/helpers/ApprovalState.enum';
import { TokenGuard } from 'src/guards/token.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/helpers/roles.enum.';

@ApiTags(`Suggestions`)
@Controller('suggestions')
export class SuggestionsController {
  constructor(private readonly suggestionsService: SuggestionsService) {}

  @Get('pending')
  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.Admin)
  getPendingSuggestions(): Promise<Suggestion[]> {
    return this.suggestionsService.getPendingSuggestions();
  }

  @Get(':id')
  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.Admin)
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
  updateSuggestion(
    @Param('id') id: string,
    @Body() suggestion: UpdateSuggestionDto,
  ) {
    return this.suggestionsService.updateSuggestion(id, suggestion);
  }

  @Patch(':id/approve')
  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.Admin)
  async approveSuggestion(@Param('id') id: string) {
    return await this.suggestionsService.updateApprovalState(
      id,
      ApprovalState.APPROVED,
    );
  }

  @Patch(':id/reject')
  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.Admin)
  async rejectSuggestion(@Param('id') id: string) {
    return await this.suggestionsService.updateApprovalState(
      id,
      ApprovalState.REJECTED,
    );
  }
}
