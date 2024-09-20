import { Injectable } from '@nestjs/common';
import { PromotionsRepository } from './promotions.repository';

@Injectable()
export class PromotionsService {
    constructor(private readonly PromotionsRepository: PromotionsRepository) {}

    getAllPromotions() {
        return this.PromotionsRepository.getAllPromotions();
    }

    getPromotionById(id: string) {
        return this.PromotionsRepository.getPromotionById(id);
    }

    createPromotion() {
        return this.PromotionsRepository.createPromotion();
    }

    updatePromotion(id: string) {
        return this.PromotionsRepository.updatePromotion(id);
    }

    deletePromotion(id: string) {
        return this.PromotionsRepository.deletePromotion(id);
    }

}
