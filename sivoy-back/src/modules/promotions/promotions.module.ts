import { Module } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { PromotionsController } from './promotions.controller';
import { Promotion } from 'src/entities/promotion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionsRepository } from './promotions.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Promotion]), UsersModule],
  controllers: [PromotionsController],
  providers: [PromotionsService, PromotionsRepository],
  exports: [PromotionsRepository],
})
export class PromotionsModule {}
