import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from 'src/entities/donation.entity';
import { Repository } from 'typeorm';
import MercadoPagoConfig, { Preference } from 'mercadopago';
import { v4 as uuidv4 } from 'uuid';
import { config } from 'dotenv';
import { DonationStatus } from 'src/helpers/roles.enum.';
import { PreferenceData } from 'src/utils/interface.donations';
import sendEmailService from 'src/helpers/email.service';
import { donationConfirmationEmail } from 'src/utils/mail.structure';

const { MP_ACCESS_TOKEN } = process.env;

config();

@Injectable()
export class DonationsRepository {
  private client: MercadoPagoConfig;

  constructor(
    @InjectRepository(Donation)
    private readonly donationRepository: Repository<Donation>,
  ) {
    this.client = new MercadoPagoConfig({
      accessToken: MP_ACCESS_TOKEN,
    });
  }

  async createDonation(preferenceData: PreferenceData) {
    try {
      // Configuración de la preferencia de MercadoPago
      const preference = new Preference(this.client);

      const response = await preference.create({
        body: {
          payment_methods: {
            excluded_payment_methods: [],
            installments: 1,
          },
          items: [
            {
              id: uuidv4(),
              title: 'Donación para Si, voy', // Título fijo
              unit_price: preferenceData.unit_price, // Se usa el unit_price del body
              quantity: 1, // Cantidad fija
            },
          ],
          payer: {
            email: preferenceData.email, // Capturado del body
            name: preferenceData.name, // Capturado del body
          },
          back_urls: {
            success: 'https://front-eta-teal.vercel.app',
            failure: 'https://front-eta-teal.vercel.app/',
            pending: 'https://front-eta-teal.vercel.app/',
          },
          auto_return: 'approved',
        },
      });

      const initPoint = response.sandbox_init_point || null;

      if (!initPoint) {
        throw new HttpException(
          {
            status: 500,
            error: 'Error creating donation: No init point found',
          },
          500,
        );
      }

      // Guardar la donación en la base de datos
      const donation = this.donationRepository.create({
        amount: preferenceData.unit_price, // Guardar el unit_price en amount
        date: new Date(),
        description: preferenceData.description,
        payer: {
          email: preferenceData.email,
          name: preferenceData.name,
        }, // Asegúrate de que el modelo Donation tenga estos campos
        status: DonationStatus.PENDING,
      });

      await this.donationRepository.save(donation);

      // Construir la respuesta personalizada
      const customResponse = {
        id: response.id,
        init_point: initPoint,
        payer: {
          email: preferenceData.email,
          name: preferenceData.name,
        },
        items: [
          {
            title: 'Donación para Sí, voy',
            unit_price: preferenceData.unit_price,
          },
        ],
      };

      return customResponse; // Devuelve la respuesta personalizada
    } catch (error) {
      console.error('Error during createDonation:', error);
      throw new HttpException(
        { status: 500, error: `Error creating donation: ${error.message}` },
        500,
      );
    }
  }

  async getAllDonations(): Promise<Donation[]> {
    try {
      return await this.donationRepository.find();
    } catch (error) {
      throw new HttpException(
        { status: 500, error: 'Error fetching all donations' },
        500,
      );
    }
  }

  async getDonationById(id: string): Promise<Donation> {
    try {
      const donation = await this.donationRepository.findOne({ where: { id } });
      if (!donation) {
        throw new HttpException(
          { status: 404, error: `Donation with ID ${id} not found` },
          404,
        );
      }
      return donation;
    } catch (error) {
      throw new HttpException(
        {
          status: 500,
          error: `Error fetching donation by ID: ${error.message}`,
        },
        500,
      );
    }
  }

  async getDonationsByUser(userId: string): Promise<Donation[]> {
    try {
      const donations = await this.donationRepository.findBy({
        user: { id: userId },
      });
      if (!donations || donations.length === 0) {
        throw new HttpException(
          { status: 404, error: `No donations found for user ${userId}` },
          404,
        );
      }
      return donations;
    } catch (error) {
      throw new HttpException(
        { status: 500, error: `Error fetching donations for user ${userId}` },
        500,
      );
    }
  }

  async makeDonation(preferenceData: PreferenceData): Promise<any> {
    return await this.createDonation(preferenceData);
  }

  async updateDonationStatus(
    id: string,
    status: DonationStatus,
  ): Promise<void> {
    try {
      const donation = await this.donationRepository.findOne({ where: { id } });
      if (!donation) {
        throw new HttpException(
          { status: 404, error: `Donation with ID ${id} not found` },
          404,
        );
      }

      donation.status = status;
      await this.donationRepository.save(donation);

      // Enviar correo solo si la donación es exitosa
      if (status === DonationStatus.COMPLETED) {
        const emailSubject = 'Gracias por tu donación';
        const emailHtml = donationConfirmationEmail(
          donation.payer.name,
          donation.amount,
        );
        await sendEmailService(donation.payer.email, emailSubject, emailHtml);
      }
    } catch (error) {
      throw new HttpException(
        {
          status: 500,
          error: `Error updating donation status: ${error.message}`,
        },
        500,
      );
    }
  }
}
