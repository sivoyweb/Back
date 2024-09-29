import { Injectable, HttpException } from '@nestjs/common';
import { DonationsRepository } from './donations.repository';
import { PreferenceData } from 'src/utils/interface.donations';
import { Donation } from 'src/entities/donation.entity';

@Injectable()
export class DonationsService {
  constructor(private readonly donationsRepository: DonationsRepository) {}

  async makeDonation(preferenceData: PreferenceData): Promise<any> {
    try {
      const response =
        await this.donationsRepository.makeDonation(preferenceData);
      return {
        status: 'success',
        payment_url: response.body.sandbox_init_point,
        preference_id: response.body.id,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 500,
          error: `Error creating donation: ${error.message}`,
        },
        500,
      );
    }
  }

  async getAllDonations(): Promise<Donation[]> {
    return this.donationsRepository.getAllDonations();
  }

  async getDonationById(id: string): Promise<Donation> {
    return this.donationsRepository.getDonationById(id);
  }

  async getDonationsByUser(userId: string): Promise<Donation[]> {
    return this.donationsRepository.getDonationsByUser(userId);
  }

  async processPaymentNotification(payload: any): Promise<{ message: string }> {
    try {
      // Validación del payload
      if (!payload || !payload.id || !payload.status) {
        throw new HttpException({ status: 400, error: 'Invalid payload' }, 400);
      }

      const { id, status } = payload;

      // Actualiza el estado de la donación en el repositorio
      await this.donationsRepository.updateDonationStatus(id, status);

      // Puedes agregar más lógica según sea necesario
      return { message: 'Payment status updated successfully' };
    } catch (error) {
      throw new HttpException(
        {
          status: 500,
          error: `Error processing payment notification: ${error.message}`,
        },
        500,
      );
    }
  }
}
