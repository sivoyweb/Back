import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DonationsService } from './donations.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateDonationDto, PaymentNotificationDto } from './donations.dto';
import { Donation } from 'src/entities/donation.entity';

@ApiTags('Donations')
@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Donation created successfully.' })
  async makeDonation(
    @Body() createDonationDto: CreateDonationDto, // Usa un DTO para la validación
  ): Promise<{ status: string; payment_url: string; preference_id: string }> {
    return await this.donationsService.makeDonation(createDonationDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Retrieved all donations.' })
  async getAllDonations(): Promise<Donation[]> {
    return await this.donationsService.getAllDonations();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Retrieved donation by ID.' })
  async getDonationById(@Param('id') id: string): Promise<Donation> {
    return await this.donationsService.getDonationById(id);
  }

  @Get('user/:userId')
  @ApiResponse({ status: 200, description: 'Retrieved donations for user.' })
  async getDonationsByUser(
    @Param('userId') userId: string,
  ): Promise<Donation[]> {
    return await this.donationsService.getDonationsByUser(userId);
  }

  @Post('webhook')
  @ApiResponse({
    status: 200,
    description: 'Payment notification processed successfully.',
  })
  async handlePaymentWebhook(
    @Body() payload: PaymentNotificationDto,
  ): Promise<{ message: string }> {
    console.log('Received payment webhook:', payload);
    return await this.donationsService.processPaymentNotification(payload);
  }
}
