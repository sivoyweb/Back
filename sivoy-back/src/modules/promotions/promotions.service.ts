import { Injectable } from '@nestjs/common';
import { PromotionsRepository } from './promotions.repository';
import { Promotion } from 'src/entities/promotion.entity';

@Injectable()
export class PromotionsService {
  constructor(private readonly PromotionsRepository: PromotionsRepository) {}

  getAllPromotions() {
    return this.PromotionsRepository.getAllPromotions();
  }

  getPromotionById(id: string) {
    return this.PromotionsRepository.getPromotionById(id);
  }

  createPromotion(promotionData: Partial<Promotion>) {
    return this.PromotionsRepository.createPromotion(promotionData);
  }

  updatePromotion(id: string, updateData: Partial<Promotion>) {
    return this.PromotionsRepository.updatePromotion(id, updateData);
  }

  deletePromotion(id: string) {
    return this.PromotionsRepository.deletePromotion(id);
  }
}
