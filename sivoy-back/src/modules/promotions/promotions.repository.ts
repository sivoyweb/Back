import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Promotion } from 'src/entities/promotion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PromotionsRepository {
  constructor(
    @InjectRepository(Promotion)
    private readonly promotionRepostitory: Repository<Promotion>,
  ) {}

  getAllPromotions() {
    return 'All Promotions';
  }

  getPromotionById(id: string) {
    return 'Promotion by id';
  }

  createPromotion() {
    return 'Promotion created';
  }

  updatePromotion(id: string) {
    return 'Promotion updated';
  }

  deletePromotion(id: string) {
    return 'Promotion deleted';
  }
}
