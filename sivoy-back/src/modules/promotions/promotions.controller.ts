import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(`Promotions`)
@Controller('promotions')
export class PromotionsController {
  constructor(private readonly PromotionsService: PromotionsService) {}

  @Get()
  getAllPromotions() {
    return this.PromotionsService.getAllPromotions();
  }

  @Get(':id')
  getPromotionById(@Param('id') id: string) {
    return this.PromotionsService.getPromotionById(id);
  }

  @Post()
  createPromotion() {
    return this.PromotionsService.createPromotion();
  }

  @Put(':id')
  updatePromotion(@Param('id') id: string) {
    return this.PromotionsService.updatePromotion(id);
  }

  @Delete(':id')
  deletePromotion(@Param('id') id: string) {
    return this.PromotionsService.deletePromotion(id);
  }
}
