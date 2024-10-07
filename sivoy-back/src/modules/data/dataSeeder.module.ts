import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Disability } from 'src/entities/disabilities.entity';
import { DataSeederService } from './dataSeeder.service';
import { Travel } from 'src/entities/travel.entity';
import { Image } from 'src/entities/images.entity';
import { Promotion } from 'src/entities/promotion.entity';
import { DataController } from './dataSeeder.controller';
import { UsersModule } from '../users/users.module';
import { User } from 'src/entities/user.entity';
import { Blog } from 'src/entities/blogs.entity';
import { Alliance } from 'src/entities/alliances.entity';
import { Credential } from 'src/entities/credential.entity';
import { Team } from 'src/entities/team.entity';
import { Provider } from 'src/entities/provider.entity';
import { Faq } from 'src/entities/faq.entity';
import { DisabilitiesModule } from '../disabilities/disabilities.module';
import { TravelsModule } from '../travels/travels.module';
import { PromotionsModule } from '../promotions/promotions.module';
import { BlogsModule } from '../blogs/blogs.module';
import { AlliancesModule } from '../alliances/alliances.module';
import { TeamModule } from '../team/team.module';
import { ProvidersModule } from '../providers/providers.module';
import { FaqModule } from '../faq/faq.module';
import { DonationsModule } from '../donations/donations.module';
import { Donation } from 'src/entities/donation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Disability,
      Travel,
      Image,
      Promotion,
      User,
      Blog,
      Alliance,
      Credential,
      Team,
      Provider,
      Promotion,
      Faq,
      Donation,
    ]),
    UsersModule,
    DisabilitiesModule,
    TravelsModule,
    PromotionsModule,
    BlogsModule,
    AlliancesModule,
    TeamModule,
    ProvidersModule,
    PromotionsModule,
    FaqModule,
    DonationsModule,
  ],
  controllers: [DataController],
  providers: [DataSeederService],
})
export class DataSeederModule {}
