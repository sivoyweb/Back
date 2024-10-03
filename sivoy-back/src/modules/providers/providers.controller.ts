import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateProviderDto, UpdateProviderDto } from './providers.dto';

@ApiTags(`Providers`)
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
  createProvider(@Body() provider: CreateProviderDto) {
    return this.providersService.createProvider(provider);
  }

  @Put(':id')
  updateProvider(@Param('id') id: string, provider: UpdateProviderDto) {
    return this.providersService.updateProvider(id, provider);
  }

  @Delete(':id')
  deleteProvider(@Param('id') id: string) {
    return this.providersService.deleteProvider(id);
  }

  @Patch(':id')
  restoreProvider(@Param('id') id: string) {
    return this.providersService.restoreProvider(id);
  }
}
