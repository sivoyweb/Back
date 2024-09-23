import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { TravelsService } from './travels.service';
import { Review } from 'src/entities/review.entity';
import { Travel } from 'src/entities/travel.entity';
import { CreateTravelDto } from './travels.dto';
import { create } from 'domain';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/helpers/roles.enum.';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags(`Travels`)
@Controller('travels')
export class TravelsController {
  constructor(private readonly travelsService: TravelsService) {}

  @Get()
  getTravelsAvailable(
    @Query(`page`) page: number = 1,
    @Query(`limit`) limit: number = 2,
  ) {
    return this.travelsService.getTravelsAvailable(page, limit);
  }

  @Get()
  getAllTravels(
    @Query(`page`) page: number = 1,
    @Query(`limit`) limit: number = 10,
  ) {
    return this.travelsService.getAllTravels(page, limit);
  }

  @Get(':id')
  getTravelById(@Param(`id`) id: string) {
    return this.travelsService.getTravelById(id);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Post()
  async createTravel(@Body() travel: CreateTravelDto) {
    travel.date = new Date().toISOString();
    return this.travelsService.createTravel(travel);
  }

  @Put(':id')
  updateTravel(@Param('id') id: string, @Body() Review: Review) {
    return this.travelsService.updateTravel(id, Review);
  }

  @Delete(':id')
  deleteTravel(@Param('id') id: string) {
    return this.travelsService.deleteTravel(id);
  }

  @Get('/reviews')
  getReviews() {
    return this.travelsService.getReviews();
  }

  @Get('/:id/reviews')
  getReviewsByTravel(@Param('id') id: string) {
    return this.travelsService.getReviewsByTravel(id);
  }

  @Post('/reviews/:id')
  createReview(@Param('id') id: string, @Body() Review: Review) {
    return this.travelsService.createReview(Review);
  }

  @Put('/reviews/:id')
  updateReview(@Param('id') id: string, @Body() Review: Review) {
    return this.travelsService.updateReview(id, Review);
  }
}
