import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { DisabilitiesService } from './disabilities.service';
import { addDisabilityDto, UpdateDisabilityDto } from './disabilities.dto';

@Controller('disabilities')
export class DisabilitiesController {
  constructor(private readonly disabilitiesService: DisabilitiesService) {}

  @Get()
  async getDisabilities() {
    const disabilities = await this.disabilitiesService.getDisabilities();
    return disabilities;
  }

  @Get('/:id')
  async getDisabilityById(@Param('id') id: string) {
    const disability = await this.disabilitiesService.getDisabilityById(id);
    return disability;
  }

  @Post()
  async addDisability(@Body() disabilityData: addDisabilityDto) {
    return await this.disabilitiesService.addDisability(disabilityData);
  }

  @Put('/:id')
  async modifyDisability(
    @Body() disabilityData: UpdateDisabilityDto,
    @Param('id') id: string,
  ) {
    return await this.disabilitiesService.modifyDisability(disabilityData, id);
  }

  @Delete('/:id')
  async removeDisability(@Param('id') id: string) {
    return await this.disabilitiesService.removeDisability(id);
  }
}
