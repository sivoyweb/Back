import { Injectable } from '@nestjs/common';
import { PromotionsRepository } from './promotions.repository';
import { Promotion } from 'src/entities/promotion.entity';
import { CreatePromotionDto, UpdatePromotionDto } from './promotion.dto';

@Injectable()
export class PromotionsService {
  constructor(private readonly promotionsRepository: PromotionsRepository) {}

  async getAllPromotions(role: 'user' | 'admin'): Promise<Promotion[]> {
    return await this.promotionsRepository.getAllPromotions(role);
  }

  async getPromotionById(id: string): Promise<Promotion> {
    return await this.promotionsRepository.getPromotionById(id);
  }

  async getPromotionByName(name: string): Promise<Promotion[]> {
    return await this.promotionsRepository.getPromotionByName(name);
  }

  async createPromotion(
    createPromotionDto: CreatePromotionDto,
  ): Promise<Promotion> {
    return await this.promotionsRepository.createPromotion(createPromotionDto);
  }

  async updatePromotion(
    id: string,
    updatePromotionDto: UpdatePromotionDto,
  ): Promise<Promotion> {
    return await this.promotionsRepository.updatePromotion(
      id,
      updatePromotionDto,
    );
  }

  async deactivatePromotion(id: string): Promise<Promotion> {
    return await this.promotionsRepository.deactivatePromotion(id);
  }

  async desactivateExpiredPromotions(): Promise<void> {
    return await this.promotionsRepository.desactivateExpiredPromotions();
  }
}
