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
import { DatabaseModule } from './modules/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './config/envConfig';
import { DataSeederModule } from './modules/data/dataSeeder.module';
import { BlogsModule } from './modules/blogs/blogs.module';
import { DisabilitiesModule } from './modules/disabilities/disabilities.module';
import { TeamModule } from './modules/team/team.module';
import { FaqModule } from './modules/faq/faq.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    TravelsModule,
    ProvidersModule,
    DonationsModule,
    SuggestionsModule,
    DisabilitiesModule,
    AuthModule,
    PromotionsModule,
    DataSeederModule,
    BlogsModule,
    TeamModule,
    FaqModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: JWT_SECRET,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
