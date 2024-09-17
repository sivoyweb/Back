import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TravelsModule } from './modules/travels/travels.module';
import { ProvidersModule } from './modules/providers/providers.module';
import { DonationsModule } from './modules/donations/donations.module';
import { SuggestionsModule } from './modules/suggestions/suggestions.module';
import { AuthModule } from './modules/auth/auth.module';
import { PromotionsModule } from './modules/promotions/promotions.module';

@Module({
  imports: [UsersModule, TravelsModule, ProvidersModule, DonationsModule, SuggestionsModule, AuthModule, PromotionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
