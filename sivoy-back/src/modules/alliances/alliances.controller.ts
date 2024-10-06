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
import { AlliancesService } from './alliances.service';
import { CreateAllianceDto, UpdateAllianceDto } from './alliances.dto';

@Controller('alliances')
export class AlliancesController {
  constructor(private readonly alliancesService: AlliancesService) {}

  @Get()
  getAllAlliances() {
    return this.alliancesService.getAllAlliances();
  }

  @Get(':id')
  getAllianceById(@Param('id') id: string) {
    return this.alliancesService.getAllianceById(id);
  }

  @Post()
  createAlliance(@Body() alliance: CreateAllianceDto) {
    return this.alliancesService.createAlliance(alliance);
  }

  @Put(':id')
  updateAlliance(@Param('id') id: string, @Body() alliance: UpdateAllianceDto) {
    return this.alliancesService.updateAlliance(id, alliance);
  }

  @Delete(':id')
  deleteAlliance(@Param('id') id: string) {
    return this.alliancesService.deleteAlliance(id);
  }

  @Patch(':id')
  restoreAlliance(@Param('id') id: string) {
    return this.alliancesService.restoreAlliance(id);
  }
}
