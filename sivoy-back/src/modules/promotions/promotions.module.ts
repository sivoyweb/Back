import { Module } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { PromotionsController } from './promotions.controller';
import { Promotion } from 'src/entities/promotion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionsRepository } from './promotions.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Promotion])],
  controllers: [PromotionsController],
  providers: [PromotionsService, PromotionsRepository],
})
export class PromotionsModule {}
