import { Injectable } from '@nestjs/common';
import { ProvidersRepository } from './providers.repository';
import { CreateProviderDto, UpdateProviderDto } from './providers.dto';

@Injectable()
export class ProvidersService {
  constructor(private readonly ProvidersRepository: ProvidersRepository) {}

  getAllProviders() {
    return this.ProvidersRepository.getAllProviders();
  }

  getProviderById(id: string) {
    return this.ProvidersRepository.getProviderById(id);
  }

  createProvider(provider: CreateProviderDto) {
    return this.ProvidersRepository.createProvider(provider);
  }
  updateProvider(id: string, provider: UpdateProviderDto) {
    return this.ProvidersRepository.updateProvider(id, provider);
  }
  deleteProvider(id: string) {
    return this.ProvidersRepository.deleteProvider(id);
  }
  restoreProvider(id: string) {
    return this.ProvidersRepository.restoreProvider(id);
  }
}
