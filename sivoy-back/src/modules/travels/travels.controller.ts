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
import {
  CreateReviewDto,
  CreateTravelDto,
  UpdateTravelDto,
} from './travels.dto';
import { create } from 'domain';

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

  @Get('/all')
  getAllTravels(
    @Query(`page`) page: number = 1,
    @Query(`limit`) limit: number = 2,
  ) {
    return this.travelsService.getAllTravels(page, limit);
  }

  @Get(':id')
  getTravelById(@Param(`id`) id: string) {
    return this.travelsService.getTravelById(id);
  }

  @Post()
  async createTravel(@Body() travel: CreateTravelDto) {
    travel.date = new Date().toISOString();
    return this.travelsService.createTravel(travel);
  }

  @Put(':id')
  updateTravel(@Param('id') id: string, @Body() travel: UpdateTravelDto) {
    return this.travelsService.updateTravel(id, travel);
  }

  @Delete(':id')
  deleteTravel(@Param('id') id: string) {
    return this.travelsService.deleteTravel(id);
  }

  @Get('/:id/reviews')
  getReviewsByTravel(@Param('id') id: string) {
    return this.travelsService.getReviewsByTravel(id);
  }

  @Post('reviews')
  createReview(@Body() Review: CreateReviewDto) {
    return this.travelsService.createReview(Review);
  }

  @Put('/reviews/:id')
  updateReview(@Param('id') id: string, @Body() Review: Review) {
    return this.travelsService.updateReview(id, Review);
  }

<<<<<<< HEAD
  @Delete('/reviews/:id')
  deleteReview(@Param('id') id: string) {
    return this.travelsService.deleteReview(id);
  }
=======
>>>>>>> 9d2710ee8b5c1c3e633215912646786b62180267
}
