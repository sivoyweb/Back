import { Injectable } from '@nestjs/common';
import { DonationsRepository } from './donations.repository';

@Injectable()
export class DonationsService {
    constructor(private readonly DonationsRepository: DonationsRepository) {}

    getAllDonations() {
        return this.DonationsRepository.getAllDonations()
    }
    getDonationById(id: string) {
        return this.DonationsRepository.getDonationById()
    }

    getDonationsByUser(id: string) {
        return this.DonationsRepository.getDonationsByUser()
    }

    makeDonation() {
        return this.DonationsRepository.makeDonation()
    }

}
