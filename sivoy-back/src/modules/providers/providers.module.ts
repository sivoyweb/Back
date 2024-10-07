import { Module } from '@nestjs/common';
import { ProvidersController } from './providers.controller';
import { ProvidersService } from './providers.service';
import { Provider } from 'src/entities/provider.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvidersRepository } from './providers.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Provider])],
  controllers: [ProvidersController],
  providers: [ProvidersService, ProvidersRepository],
  exports: [ProvidersRepository],
})
export class ProvidersModule {}
