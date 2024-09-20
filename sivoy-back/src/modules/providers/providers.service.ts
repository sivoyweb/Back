import { Injectable } from '@nestjs/common';
import { ProvidersRepository } from './providers.repository';

@Injectable()
export class ProvidersService {
  constructor(private readonly ProvidersRepository: ProvidersRepository) {}

  getAllProviders() {
    return this.ProvidersRepository.getAllProviders();
  }

  getProviderById(id: string) {
    return this.ProvidersRepository.getProviderById(id);
  }

  createProvider() {
    return this.ProvidersRepository.createProvider();
  }
  updateProvider(id: string) {
    return this.ProvidersRepository.updateProvider(id);
  }
}
