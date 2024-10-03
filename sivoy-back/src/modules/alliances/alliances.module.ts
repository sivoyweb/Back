import { Module } from '@nestjs/common';
import { AlliancesController } from './alliances.controller';
import { AlliancesService } from './alliances.service';

@Module({
  controllers: [AlliancesController],
  providers: [AlliancesService]
})
export class AlliancesModule {}
