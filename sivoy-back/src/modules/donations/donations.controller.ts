import { Controller, Get, Param, Post } from '@nestjs/common';
import { DonationsService } from './donations.service';

@Controller('donations')
export class DonationsController {
    constructor (private readonly donationService: DonationsService) {}

    @Get()
    getAllDonations() {
        return this.donationService.getAllDonations();
    }

    @Get(':id')
    getDonationById(@Param('id') id: string) {
        return this.donationService.getDonationById(id);
    }

    @Get('/user/:id')
    getDonationsByUser(@Param('id') id: string) {
        return this.donationService.getDonationsByUser(id);
    }

    @Post()
    makeDonation() {
        return this.donationService.makeDonation();
    }
    
}
