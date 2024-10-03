import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from 'src/entities/provider.entity';

import { Repository } from 'typeorm';
import { CreateProviderDto, UpdateProviderDto } from './providers.dto';

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
    if (!provider) {
      throw new NotFoundException(`Provider with ID ${id} not found`);
    }
    return provider;
  }

  async createProvider(provider: CreateProviderDto) {
    const existingProvider = await this.providersRepository.findOne({
      where: { name: provider.name },
    });

    if (existingProvider) {
      throw new BadRequestException(
        `A Provider with the name '${provider.name}' already exists.`,
      );
    }
    const newProvider = this.providersRepository.create(provider);

    try {
      return await this.providersRepository.save(newProvider);
    } catch (error) {
      throw new BadRequestException(
        `Error creating provider: ${error.message}`,
      );
    }
  }

  async updateProvider(id: string, provider: UpdateProviderDto) {
    const updateProvider = await this.providersRepository.findOneBy({ id });
    if (!updateProvider)
      throw new NotFoundException(`Provider whit ${id} not found`);
    await this.providersRepository.update(id, provider);
    return updateProvider;
  }

  async deleteProvider(id: string) {
    const provider = await this.providersRepository.findOneBy({ id });
    if (!provider) throw new NotFoundException(`provider whit ${id} not found`);
    if (provider.visible === false)
      throw new BadRequestException('This provider was no longer available');
    provider.visible = false;
    await this.providersRepository.save(provider);
    return provider;
  }

  async restoreProvider(id: string) {
    const provider = await this.providersRepository.findOneBy({ id });
    if (!provider) throw new NotFoundException(`provider with ${id} not found`);
    if (provider.visible === true)
      throw new BadRequestException('This provider is already visible');
    provider.visible = true;
    await this.providersRepository.save(provider);
    return provider;
  }
}
