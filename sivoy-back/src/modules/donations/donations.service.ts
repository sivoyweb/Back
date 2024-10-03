import { Injectable, HttpException } from '@nestjs/common';
import { DonationsRepository } from './donations.repository';
import { PreferenceData } from 'src/utils/interface.donations'; // Asegúrate de que esta interfaz no tenga 'quantity'
import { Donation } from 'src/entities/donation.entity';

@Injectable()
export class DonationsService {
  constructor(private readonly donationsRepository: DonationsRepository) {}

  // Método para crear una donación
  async makeDonation(preferenceData: PreferenceData): Promise<any> {
    try {
      // Llama al repositorio para crear la donación sin manejar la cantidad
      const response =
        await this.donationsRepository.makeDonation(preferenceData);

      // Log para verificar el response completo
      console.log('Mercado Pago Response:', response);

      // Obtén el init_point de la respuesta
      const initPoint = response.sandbox_init_point || response.init_point;

      if (!initPoint) {
        throw new HttpException(
          {
            status: 500,
            error: 'Error creating donation: No payment URL found',
          },
          500,
        );
      }
      // Log del initPoint y el preference_id
      console.log('Payment URL:', initPoint);
      console.log('Preference ID:', response.id);

      // Retorna el resultado de la creación de la preferencia de pago
      return {
        status: 'success',
        payment_url: initPoint, // Usa el initPoint en lugar de response.body.sandbox_init_point
        preference_id: response.id, // Usa response.id directamente
      };
    } catch (error) {
      // Log del error capturado
      console.error('Error during makeDonation:', error.message);
      // Manejo de errores si la creación de la donación falla
      throw new HttpException(
        {
          status: 500,
          error: `Error creating donation: ${error.message}`,
        },
        500,
      );
    }
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
  async processPaymentNotification(payload: any): Promise<{ message: string }> {
    try {
      // Validación del payload recibido en el webhook
      if (!payload || !payload.id || !payload.status) {
        throw new HttpException({ status: 400, error: 'Invalid payload' }, 400);
      }

      const { id, status } = payload;

      // Actualiza el estado de la donación en base al ID de la notificación
      await this.donationsRepository.updateDonationStatus(id, status);

      return { message: 'Payment status updated successfully' };
    } catch (error) {
      // Manejo de errores si el proceso de la notificación falla
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
