import { Module } from '@nestjs/common';
import { TravelsController } from './travels.controller';
import { TravelsService } from './travels.service';

@Module({
  controllers: [TravelsController],
  providers: [TravelsService],
})
export class TravelsModule {}
