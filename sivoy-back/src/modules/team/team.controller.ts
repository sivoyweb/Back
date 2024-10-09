import {
  Body,
  Controller,
  Delete,
  Get,
  Optional,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto, UpdateTeamDto } from './team.dto';
import { Request } from 'express';
import { ReadGuard } from 'src/guards/read.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('team')
@ApiBearerAuth()
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  getTeam() {
    return this.teamService.getTeam();
  }

  @Get(':id')
  @UseGuards(ReadGuard)
  getMemberById(@Param('id') id: string, @Req() @Optional() req: Request) {
    const user = req.user;
    return this.teamService.getMemberById(id, user);
  }

  @Post()
  addMember(@Body() member: CreateTeamDto) {
    return this.teamService.addMember(member);
  }

  @Put(':id')
  updateMember(@Param('id') id: string, @Body() member: UpdateTeamDto) {
    return this.teamService.updateMember(id, member);
  }

  @Delete(':id')
  deleteMember(@Param('id') id: string) {
    return this.teamService.deleteMember(id);
  }
}
