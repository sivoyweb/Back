import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { Promotion } from 'src/entities/promotion.entity';
import { CreatePromotionDto, UpdatePromotionDto } from './promotion.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/helpers/roles.enum.';
import { TokenGuard } from 'src/guards/token.guard';

@ApiTags('Promotions')
@ApiBearerAuth()
@Controller('promotions')
export class PromotionsController {
  constructor(private readonly promotionsService: PromotionsService) {}

  @Get()
  async getAllPromotions(): Promise<Promotion[]> {
    return await this.promotionsService.getAllPromotions();
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
  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.Admin)
  async createPromotion(
    @Body() createPromotionDto: CreatePromotionDto,
  ): Promise<Promotion> {
    return await this.promotionsService.createPromotion(createPromotionDto);
  }

  @Put(':id')
  @UseGuards(TokenGuard,RolesGuard)
  @Roles(Role.Admin)
  async updatePromotion(
    @Param('id') id: string,
    @Body() updatePromotionDto: UpdatePromotionDto,
  ): Promise<Promotion> {
    return await this.promotionsService.updatePromotion(id, updatePromotionDto);
  }

  @Delete(':id')
  @UseGuards(TokenGuard,RolesGuard)
  @Roles(Role.Admin)
  async deactivatePromotion(@Param('id') id: string): Promise<Promotion> {
    return await this.promotionsService.deactivatePromotion(id);
  }

  @Put('desactivate-expired')
  @UseGuards(TokenGuard,RolesGuard)
  @Roles(Role.Admin)
  async desactivateExpiredPromotions(): Promise<void> {
    return await this.promotionsService.desactivateExpiredPromotions();
  }
}
