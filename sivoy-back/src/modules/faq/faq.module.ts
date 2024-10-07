import { Module } from '@nestjs/common';
import { FaqController } from './faq.controller';
import { FaqService } from './faq.service';
import { FaqRepository } from './faq.repository';
import { Faq } from 'src/entities/faq.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Faq]), UsersModule],
  controllers: [FaqController],
  providers: [FaqService, FaqRepository],
  exports: [FaqRepository],
})
export class FaqModule {}
