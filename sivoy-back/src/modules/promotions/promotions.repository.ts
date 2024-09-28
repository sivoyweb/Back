import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { Promotion } from 'src/entities/promotion.entity';
import { Repository } from 'typeorm';
import { CreatePromotionDto, UpdatePromotionDto } from './promotion.dto';
import { Role } from 'src/helpers/roles.enum.';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PromotionsRepository {
  constructor(
    @InjectRepository(Promotion)
    private readonly promotionsRepository: Repository<Promotion>,
  ) {}

  async getAllPromotions(): Promise<Promotion[]> {
    try {
      return await this.promotionsRepository.find({
        where: { isActive: true }, 
      });
    } catch (error) {
      throw new HttpException(
        { status: 500, error: `Internal server error fetching promotions` },
        500,
      );
    }
  }

  async getPromotionById(id: string): Promise<Promotion> {
    try {
      const promotion = await this.promotionsRepository.findOne({
        where: { id },
      });
      if (!promotion) {
        throw new HttpException(
          { status: 404, error: `Promotion with ID ${id} not found` },
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

  async getPromotionByName(name: string): Promise<Promotion[]> {
    try {
      const promotions = await this.promotionsRepository.find({
        where: { name },
      });
      if (promotions.length === 0) {
        throw new HttpException(
          { status: 404, error: `No promotions found with the name '${name}'` },
          404,
        );
      }
      return promotions;
    } catch (error) {
      throw new HttpException(
        {
          status: 500,
          error: `Internal server error fetching promotions by name`,
        },
        500,
      );
    }
  }

  async createPromotion(
    createPromotionDto: CreatePromotionDto,
  ): Promise<Promotion> {
    try {
      const existingPromotion = await this.promotionsRepository.findOne({
        where: { name: createPromotionDto.name },
      });

      if (existingPromotion) {
        throw new BadRequestException(
          `A promotion with the name '${createPromotionDto.name}' already exists.`,
        );
      }

      const promotion = this.promotionsRepository.create(createPromotionDto);
      return await this.promotionsRepository.save(promotion);
    } catch (error) {
      throw new HttpException(
        { status: 500, error: `Internal server error creating promotion` },
        500,
      );
    }
  }

  async updatePromotion(
    id: string,
    updatePromotionDto: UpdatePromotionDto,
  ): Promise<Promotion> {
    try {
      const promotion = await this.promotionsRepository.findOne({
        where: { id },
      });
      if (!promotion) {
        throw new HttpException(
          { status: 404, error: `Promotion with ID ${id} not found` },
          404,
        );
      }

      Object.assign(promotion, updatePromotionDto);
      return await this.promotionsRepository.save(promotion);
    } catch (error) {
      throw new HttpException(
        { status: 500, error: `Internal server error updating promotion` },
        500,
      );
    }
  }

  async deactivatePromotion(id: string): Promise<Promotion> {
    try {
      const promotion = await this.promotionsRepository.findOne({
        where: { id },
      });
      if (!promotion) {
        throw new HttpException(
          { status: 404, error: `Promotion with ID ${id} not found` },
          404,
        );
      }
      promotion.isActive = false;
      return await this.promotionsRepository.save(promotion);
    } catch (error) {
      throw new HttpException(
        { status: 500, error: `Internal server error deactivating promotion` },
        500,
      );
    }
  }

  async desactivateExpiredPromotions(): Promise<void> {
    const promotions = await this.promotionsRepository.find();
    const now = new Date();

    promotions.forEach(async (promotion) => {
      if (promotion.validUntil < now) {
        promotion.isActive = false;
        await this.promotionsRepository.save(promotion);
      }
    });
  }
}
