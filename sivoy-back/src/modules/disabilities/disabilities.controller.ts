import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { DisabilitiesService } from './disabilities.service';
import { addDisabilityDto, UpdateDisabilityDto } from './disabilities.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from 'src/guards/token.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/helpers/roles.enum.';
import { Roles } from 'src/decorators/roles.decorator';

@ApiTags(`Disabilities`)
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

  @ApiBearerAuth()
  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Post()
  async addDisability(@Body() disabilityData: addDisabilityDto) {
    return await this.disabilitiesService.addDisability(disabilityData);
  }

  @ApiBearerAuth()
  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put('/:id')
  async modifyDisability(
    @Body() disabilityData: UpdateDisabilityDto,
    @Param('id') id: string,
  ) {
    return await this.disabilitiesService.modifyDisability(disabilityData, id);
  }

  @ApiBearerAuth()
  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete('/:id')
  async removeDisability(@Param('id') id: string) {
    return await this.disabilitiesService.removeDisability(id);
  }
}
