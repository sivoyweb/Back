import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Promotion } from 'src/entities/promotion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PromotionsRepository {
  constructor(
    @InjectRepository(Promotion)
    private readonly promotionRepostitory: Repository<Promotion>,
  ) {}

  async getAllPromotions(): Promise<Promotion[]> {
    try {
      return await this.promotionRepostitory.find();
    } catch (error) {
      throw new HttpException(
        { status: 500, error: `Internal server fetching all promotions` },
        500,
      );
    }
  }

  async getPromotionById(id: string): Promise<Promotion> {
    try {
      const promotion = await this.promotionRepostitory.findOne({
        where: { id },
      });
      if (!promotion) {
        throw new HttpException(
          { status: 404, error: `Promotion not found` },
          404,
        );
      }
      return promotion;
    } catch (error) {
      throw new HttpException(
        {
          status: 500,
          error: `Internal server error fetching promotion by ID`,
        },
        500,
      );
    }
  }

  async createPromotion(promotionData: Partial<Promotion>): Promise<Promotion> {
    try {
      const newPromotion = this.promotionRepostitory.create(promotionData);
      return await this.promotionRepostitory.save(newPromotion);
    } catch (error) {
      throw new HttpException(
        { status: 500, error: `Internal server error creating promotion` },
        500,
      );
    }
  }

  async updatePromotion(
    id: string,
    updateData: Partial<Promotion>,
  ): Promise<Promotion> {
    try {
      const promotion = await this.promotionRepostitory.findOne({
        where: { id },
      });
      if (promotion!) {
        throw new HttpException(
          { status: 404, error: `Promotion not found` },
          404,
        );
      }
      Object.assign(promotion, updateData);
      return await this.promotionRepostitory.save(promotion);
    } catch (error) {
      throw new HttpException(
        { status: 500, error: `Internal server error updating promotion` },
        500,
      );
    }
  }

  deletePromotion(id: string) {
    return 'Promotion deleted';
  }
}
