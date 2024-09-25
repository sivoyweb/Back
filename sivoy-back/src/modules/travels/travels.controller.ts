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
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/helpers/roles.enum.';
import { Roles } from 'src/decorators/roles.decorator';
import { TokenGuard } from 'src/guards/token.guard';

@Controller('travels')
export class TravelsController {
  constructor(private readonly travelsService: TravelsService) {}

  @Get()
  getTravelsAvailable() {
    return this.travelsService.getTravelsAvailable();
  }

  @Get('/all')
  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.Admin)
  getAllTravels() {
    return this.travelsService.getAllTravels();
  }

  @Get(':id')
  getTravelById(@Param(`id`) id: string) {
    return this.travelsService.getTravelById(id);
  }

  @Post()
  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.Admin)
  async createTravel(@Body() travel: CreateTravelDto) {
    travel.date = new Date().toISOString();
    return this.travelsService.createTravel(travel);
  }

  @Put(':id')
  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.Admin)
  updateTravel(@Param('id') id: string, @Body() travel: UpdateTravelDto) {
    return this.travelsService.updateTravel(id, travel);
  }

  @Delete(':id')
  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.Admin)
  deleteTravel(@Param('id') id: string) {
    return this.travelsService.deleteTravel(id);
  }

  @Get('/:id/reviews')
  getReviewsByTravel(@Param('id') id: string) {
    return this.travelsService.getReviewsByTravel(id);
  }

  @Post('reviews')
  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.User)
  createReview(@Body() Review: CreateReviewDto) {
    return this.travelsService.createReview(Review);
  }

  @Put('/reviews/:id')
  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.User)
  updateReview(@Param('id') id: string, @Body() Review: Review) {
    return this.travelsService.updateReview(id, Review);
  }
}
