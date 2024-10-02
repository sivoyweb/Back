import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from 'src/entities/provider.entity';

import { Repository } from 'typeorm';

@Injectable()
export class ProvidersRepository {
  constructor(
    @InjectRepository(Provider)
    private readonly providersRepository: Repository<Provider>,
  ) {}

  async getAllProviders() {
    let providers = await this.providersRepository.find({
      relations: {
        travels: true,
      },
    });
    return providers;
  }

  async getProviderById(id: string) {
    const provider = await this.providersRepository.findOne({
      where: { id },
      relations: {
        travels: true,
      },
    });
    if (!provider	) {
      throw new NotFoundException(`Provider with ID ${id} not found`);
    }
    return provider
  }

  createProvider() {
    return 'Provider Created';
  }

  updateProvider(id: string) {
    return 'Provider updated';
  }
}
