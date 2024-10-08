import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Optional,
  Param,
  Patch,
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
  UpdateReviewDto,
  UpdateTravelDto,
} from './travels.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/helpers/roles.enum.';
import { Roles } from 'src/decorators/roles.decorator';
import { TokenGuard } from 'src/guards/token.guard';
import { User } from 'src/entities/user.entity';
import { Request } from 'express';
import { ReadGuard } from 'src/guards/read.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApprovalState } from 'src/helpers/ApprovalState.enum';

@ApiTags(`Travels`)
@ApiBearerAuth()
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

  @Patch(':id')
  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.Admin)
  restoreTravel(@Param('id') id: string) {
    return this.travelsService.restoreTravel(id);
  }

  @Get('/:id/reviews')
  getReviewsByTravel(@Param('id') id: string) {
    return this.travelsService.getReviewsByTravel(id);
  }

  @Post('reviews')
  @UseGuards(ReadGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  createReview(@Body() Review: CreateReviewDto, @Req() req: Request) {
    const userId = req.user.id;
    return this.travelsService.createReview(Review, userId);
  }

  @Put('/reviews/:id')
  @UseGuards(ReadGuard)
  updateReview(
    @Param('id') id: string,
    @Body() review: UpdateReviewDto,
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
  @Patch(':id/approve')
  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.Admin)
  async approveReview(@Param('id') id: string) {
    return await this.travelsService.updateApprovalState(
      id,
      ApprovalState.APPROVED,
    );
  }

  @Patch(':id/reject')
  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.Admin)
  async rejectReview(@Param('id') id: string) {
    return await this.travelsService.updateApprovalState(
      id,
      ApprovalState.REJECTED,
    );
  }
}
