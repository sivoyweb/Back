import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProvidersService } from './providers.service';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Get()
  getAllProviders() {
    return this.providersService.getAllProviders();
  }

  @Get(':id')
  getProviderById(@Param('id') id: string) {
    return this.providersService.getProviderById(id);
  }

  @Post()
  createProvider() {
    return this.providersService.createProvider();
  }

  @Put(':id')
  updateProvider(@Param('id') id: string) {
    return this.providersService.updateProvider(id);
  }
}
