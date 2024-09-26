import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Optional,
  Param,
  Post,
  Put,
  Query,
  Req,
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
import { User } from 'src/entities/user.entity';
import { Request } from 'express';
import { ReadGuard } from 'src/guards/read.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(`Travels`)
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
  getAllTravelsAdmin() {
    return this.travelsService.getAllTravelsAdmin();
  }

  @Get(':id')
  @UseGuards(ReadGuard)
  async getTravelById(
    @Param('id') id: string,
    @Req() @Optional() req: Request,
  ) {
    const user = req.user;
    console.log(user);

    return await this.travelsService.getTravelById(id, user);
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
  @UseGuards(TokenGuard)
  createReview(@Body() Review: CreateReviewDto) {
    return this.travelsService.createReview(Review);
  }

  @Put('/reviews/:id')
  @UseGuards(ReadGuard)
  updateReview(
    @Param('id') id: string,
    @Body() review: UpdateTravelDto,
    @Req() req: Request,
  ) {
    if (!req.user) {
      throw new ForbiddenException('You must be logged in to update a review');
    }
    const userId = req.user.id;
    return this.travelsService.updateReview(id, review, userId);
  }

  @Delete('/reviews/:id')
  @UseGuards(ReadGuard)
  deleteReview(@Param('id') id: string, @Req() req: Request) {
    const userId = req.user.id;
    const userRole = req.user.role;
    return this.travelsService.deleteReview(id, userId, userRole);
  }
}
