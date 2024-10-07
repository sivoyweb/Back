import { Module } from '@nestjs/common';
import { DonationsController } from './donations.controller';
import { DonationsService } from './donations.service';
import { DonationsRepository } from './donations.repository';
import { Donation } from 'src/entities/donation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Donation])],
  controllers: [DonationsController],
  providers: [DonationsService, DonationsRepository],
  exports: [DonationsRepository],
})
export class DonationsModule {}
