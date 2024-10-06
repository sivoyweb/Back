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
import { ProjectsService } from './projects.service';
import { ReadGuard } from 'src/guards/read.guard';
import { Request } from 'express';
import { CreateProjectDto, UpdateProjectDto } from './project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getProjects() {
    return this.projectsService.getProjects();
  }

  @Get(':id')
  @UseGuards(ReadGuard)
  getProjectById(@Param('id') id: string, @Req() @Optional() req: Request) {
    const user = req.user;
    return this.projectsService.getProjectById(id, user);
  }

  @Post()
  createProject(@Body() Project: CreateProjectDto) {
    return this.projectsService.createProject(Project);
  }

  @Put(':id')
  updateProject(@Param('id') id: string, @Body() Project: UpdateProjectDto) {
    return this.projectsService.updateProject(id, Project);
  }

  @Delete(':id')
  deleteProject(@Param('id') id: string) {
    return this.projectsService.deleteProject(id);
  }
}
