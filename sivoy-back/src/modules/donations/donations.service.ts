import { Injectable, HttpException } from '@nestjs/common';
import { DonationsRepository } from './donations.repository';
import { PreferenceData } from 'src/utils/interface.donations'; // Asegúrate de que esta interfaz no tenga 'quantity'
import { Donation } from 'src/entities/donation.entity';
import { PaymentNotificationDto } from './donations.dto';
import { DonationStatus } from 'src/helpers/roles.enum.';
import { isUUID } from 'class-validator';

@Injectable()
export class DonationsService {
  constructor(private readonly donationsRepository: DonationsRepository) {}

  // Método para crear una donación
  async makeDonation(preferenceData: PreferenceData): Promise<any> {
    return this.donationsRepository.makeDonation(preferenceData);
  }

  // Obtener todas las donaciones
  async getAllDonations(): Promise<Donation[]> {
    return this.donationsRepository.getAllDonations();
  }

  // Obtener donación por ID
  async getDonationById(id: string): Promise<Donation> {
    return this.donationsRepository.getDonationById(id);
  }

  // Obtener donaciones por usuario
  async getDonationsByUser(userId: string): Promise<Donation[]> {
    return this.donationsRepository.getDonationsByUser(userId);
  }

  // Procesar notificación de pago
  async processPaymentNotification(
   
    payload: PaymentNotificationDto,
    
  ): Promise<{ message: string }> {
    
    console.log('Received payment webhook:', payload);

    const { id, data } = payload;

    // Usar el ID de data.donationId que hemos renombrado
    const donationId = data.donationId || id;

    // Verificar si donationId es un UUID válido
    if (!isUUID(donationId)) {
      throw new HttpException(`Invalid donation ID: ${donationId}`, 400);
    }

    try {
      // Intentar encontrar la donación en la base de datos
      const donation =
        await this.donationsRepository.getDonationById(donationId);

      if (!donation) {
        throw new HttpException('Donation not found', 404);
      }

      // Procesar la notificación (actualizar estado, etc.)
      donation.status = DonationStatus.APPROVED; // Ejemplo: actualizar el estado

      // Actualizar el estado de la donación
      await this.donationsRepository.updateDonationStatus(
        donationId,
        donation.status,
      );

      return { message: 'Payment notification processed successfully' };
    } catch (error) {
      console.error('Error processing payment notification:', error);
      throw new HttpException(
        'Error processing payment notification: ' + error.message,
        500,
      );
    }
  }
}
