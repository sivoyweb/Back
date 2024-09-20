import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TravelsService } from './travels.service';
import { Review } from 'src/entities/review.entity';
import { Travel } from 'src/entities/travel.entity';

@Controller('travels')
export class TravelsController {
  constructor(private readonly travelsService: TravelsService) {}

  @Get()
  getAllTravels(@Query(`page`) page: number, @Query(`limit`) limit: number) {
    return this.travelsService.getAllTravels(page, limit);
  }

  @Get('/search')
  getTravelByName(@Query(`name`) name: string) {
    return this.travelsService.getTravelByName(name);
  }

  @Post()
  createTravel(@Body() Travel: Travel) {
    return this.travelsService.createTravel(Travel);
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

  @Post('/reviews/:id')
  createReview(@Param('id') id: string, @Body() Review: Review) {
    return this.travelsService.createReview(id, Review);
  }

  @Put('/reviews/:id')
  updateReview(@Param('id') id: string, @Body() Review: Review) {
    return this.travelsService.updateReview(id, Review);
  }

  @Delete('/reviews/:id')
  deleteReview(@Param('id') id: string) {
    return this.travelsService.deleteReview(id);
  }
}
