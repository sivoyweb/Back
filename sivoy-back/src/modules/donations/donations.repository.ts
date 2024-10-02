import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from 'src/entities/donation.entity';
import { Repository } from 'typeorm';
import MercadoPagoConfig, { Preference } from 'mercadopago';
import { v4 as uuidv4 } from 'uuid';
import { config } from 'dotenv';
import { DonationStatus } from 'src/helpers/roles.enum.';
import { PreferenceData } from 'src/utils/interface.donations';

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
      console.log('preferenceData received:', preferenceData);
      const preference = new Preference(this.client);

      const response = await preference.create({
        body: {
          payment_methods: {
            excluded_payment_methods: [],
            excluded_payment_types: [{ id: 'ticket' }],
            installments: 1,
          },
          items: [
            {
              id: uuidv4(),
              title: preferenceData.title,
              unit_price: preferenceData.unit_price,
              quantity: 1, // Configura la cantidad fija en 1 para donaciones
            },
          ],
        },
      });

      console.log('MercadoPago Response:', response);

      const initPoint = response.sandbox_init_point || response.init_point;

      if (!initPoint) {
        throw new HttpException(
          {
            status: 500,
            error: 'Error creating donation: No init point found',
          },
          500,
        );
      }

      const donation = this.donationRepository.create({
        amount: preferenceData.unit_price, // Solo considera el unit_price
        date: new Date(),
        description: preferenceData.description,
        status: DonationStatus.PENDING, // Asignar un estado inicial
      });

      await this.donationRepository.save(donation);

      return response;
    } catch (error) {
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

  async makeDonation(preferenceData: any): Promise<any> {
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
