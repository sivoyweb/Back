import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { Promotion } from 'src/entities/promotion.entity';
import { CreatePromotionDto, UpdatePromotionDto } from './promotion.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/helpers/roles.enum.';

@ApiTags('Promotions')
@Controller('promotions')
export class PromotionsController {
  constructor(private readonly promotionsService: PromotionsService) {}

  @Get()
  @UseGuards(RolesGuard)
  async getAllPromotions(
    @Query('role') role: 'user' | 'admin',
  ): Promise<Promotion[]> {
    return await this.promotionsService.getAllPromotions(role);
  }

  @Get(':id')
  async getPromotionById(@Param('id') id: string): Promise<Promotion> {
    return await this.promotionsService.getPromotionById(id);
  }

  @Get('name/:name')
  async getPromotionByName(@Param('name') name: string): Promise<Promotion[]> {
    return await this.promotionsService.getPromotionByName(name);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async createPromotion(
    @Body() createPromotionDto: CreatePromotionDto,
  ): Promise<Promotion> {
    return await this.promotionsService.createPromotion(createPromotionDto);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async updatePromotion(
    @Param('id') id: string,
    @Body() updatePromotionDto: UpdatePromotionDto,
  ): Promise<Promotion> {
    return await this.promotionsService.updatePromotion(id, updatePromotionDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async deactivatePromotion(@Param('id') id: string): Promise<Promotion> {
    return await this.promotionsService.deactivatePromotion(id);
  }

  @Post('deactivate-expired')
  async deactivateExpiredPromotions(): Promise<void> {
    return await this.promotionsService.deactivateExpiredPromotions();
  }
}
