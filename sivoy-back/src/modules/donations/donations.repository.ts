import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from 'src/entities/donation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DonationsRepository {
  constructor(
    @InjectRepository(Donation)
    private readonly donationRepository: Repository<Donation>,
  ) {}

  getAllDonations() {
    return 'All Donations';
  }

  getDonationById() {
    return 'donation by id';
  }

  getDonationsByUser() {
    return 'donations by user';
  }

  makeDonation() {
    return 'make donation';
  }
}
