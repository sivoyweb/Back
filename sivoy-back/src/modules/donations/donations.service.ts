import { Injectable, HttpException } from '@nestjs/common';
import { DonationsRepository } from './donations.repository';
import { PreferenceData } from 'src/utils/interface.donations'; // Asegúrate de que esta interfaz no tenga 'quantity'
import { Donation } from 'src/entities/donation.entity';
import { PaymentNotificationDto } from './donations.dto';
import { DonationStatus } from 'src/helpers/roles.enum.';
import { isUUID } from 'class-validator';
import axios, { Axios } from 'axios';
import { MP_ACCESS_TOKEN } from 'src/config/envConfig';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DonationsService {
  constructor(private readonly donationsRepository: DonationsRepository,@InjectRepository(Donation)
  private readonly Repo: Repository<Donation>,) {}

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
  // async processPaymentNotification(
  //   payload: PaymentNotificationDto,
  // ): Promise<{ message: string }> {
  //   console.log('Received payment webhook:', payload);

  //   const { id, data } = payload;
  //   const donationId = data.donationId || id;
  //   console.log(donationId)
  //   // Verificar si donationId es un UUID válido
  //   if (!isUUID(donationId)) {
  //     throw new HttpException(`Invalid donation ID: ${donationId}`, 400);
  //   }

  //   try {
  //     // Intentar encontrar la donación en la base de datos
  //     const donation =
  //       await this.donationsRepository.getDonationById(donationId);
  //     if (!donation) {
  //       throw new HttpException('Donation not found', 404);
  //     }

  //     // Procesar la notificación (actualizar estado, etc.)
  //     donation.status = DonationStatus.APPROVED; // Cambiar el estado de la donación

  //     // Responder a Mercado Pago antes de hacer el procesamiento
  //     return { message: 'Payment notification received' };
  //   } catch (error) {
  //     console.error('Error processing payment notification:', error);
  //     throw new HttpException(
  //       'Error processing payment notification: ' + error.message,
  //       500,
  //     );
  //   }
  // }


  // async getPaymentDetails (paymentId: string) {
  //   try {
  //     const response = await axios.get(
  //       `https://api.mercadopago.com/sandbox/v1/payments/${paymentId}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
  //         },
  //       }
  //     );
  //     console.log(response.data); // Aquí obtendrás los detalles completos del pago

  //     return response.data
  //   } catch (error) {
  //     console.error('Error fetching payment details:', error);
    
  //   }
  // }



  async processPaymentNotification(data: any): Promise<{ message: string }> {
    console.log('Recibiendo la data de payment:', data);
  
    // Suponiendo que el data contiene el id del pago
    const donationId = data.donationId || data.id;
  
    // Verificar si donationId es un UUID válido
    if (!isUUID(donationId)) {
      throw new HttpException(`Invalid donation ID: ${donationId}`, 400);
    }
  
    try {
      // Intentar encontrar la donación en la base de datos
      const donation = await this.donationsRepository.getDonationById(donationId);
      if (!donation) {
        throw new HttpException('Donation not found', 404);
      }
  
      // Procesar la notificación (actualizar estado, etc.)
      donation.status = DonationStatus.APPROVED; // Cambiar el estado de la donación
  
      // Guardar los cambios en la base de datos
      await this.Repo.save(donation);
  
      // Responder a Mercado Pago
      return { message: 'Payment notification received' };
    } catch (error) {
      console.error('Error al procesar la notificacion:', error);
      throw new HttpException(
        'Error processing payment notification: ' + error.message,
        500
      );
    }
  }


  async getPaymentDetails(paymentId: string) {
    try {
      const response = await axios.get(
        `https://api.mercadopago.com/sandbox/v1/payments/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
          },
        }
      );
      console.log('Obteniendo la data directamente del pago:', response.data); // Aquí obtendrás los detalles completos del pago
  
      return response.data;
    } catch (error) {
      console.error('Error fetching payment details:', error);
      throw new HttpException('Error fetching payment details: ' + error.message, 500);
    }
  }
  
}


