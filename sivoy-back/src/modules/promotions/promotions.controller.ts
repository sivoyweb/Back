import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { ApiTags } from '@nestjs/swagger';
import { CreatePromotionDto } from './promotion.dto';

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
  createPromotion(@Body() createPromotionDto: CreatePromotionDto) {
    const promotionData = {
      ...createPromotionDto,
      validUntil: new Date(createPromotionDto.validUntil),
    };

    return this.PromotionsService.createPromotion(promotionData);
  }

  @Put(':id')
  updatePromotion(
    @Param('id') id: string,
    @Body() updateData: Partial<CreatePromotionDto>,
  ) {
    const updatedPromotionData = {
      ...updateData,
      ...(updateData.validUntil && {
        validUntil: new Date(updateData.validUntil),
      }),
    };

    return this.PromotionsService.updatePromotion(id, updatedPromotionData);
  }

  @Delete(':id')
  deletePromotion(@Param('id') id: string) {
    return this.PromotionsService.deletePromotion(id);
  }
}
