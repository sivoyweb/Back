import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { AlliancesService } from './alliances.service';
import { CreateAllianceDto, UpdateAllianceDto } from './alliances.dto';
import { ApiTags } from '@nestjs/swagger';
import { TokenGuard } from 'src/guards/token.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/helpers/roles.enum.';

@ApiTags('Alliances')
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
    @UseGuards(TokenGuard, RolesGuard)
    @Roles(Role.Admin)
    createAlliance(@Body() alliance: CreateAllianceDto) {
        return this.alliancesService.createAlliance(alliance);
    }

    @Put(':id')
    @UseGuards(TokenGuard, RolesGuard)
    @Roles(Role.Admin)
    updateAlliance(@Param('id') id: string, @Body() alliance: UpdateAllianceDto) {
        return this.alliancesService.updateAlliance(id, alliance);
    }

    @Delete(':id')
    @UseGuards(TokenGuard, RolesGuard)
    @Roles(Role.Admin)
    deleteAlliance(@Param('id') id: string) {
        return this.alliancesService.deleteAlliance(id);
    }

    @Patch(':id')
    @UseGuards(TokenGuard, RolesGuard)
    @Roles(Role.Admin)
    restoreAlliance(@Param('id') id: string) {
        return this.alliancesService.restoreAlliance(id);
    }
}
