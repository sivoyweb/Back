import { Injectable } from '@nestjs/common';
import { ProjectsRepository } from './projects.repository';
import { CreateProjectDto, UpdateProjectDto } from './project.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class ProjectsService {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  getProjects() {
    return this.projectsRepository.getProjects();
  }

  getProjectById(id: string, user: User) {
    return this.projectsRepository.getProjectById(id, user);
  }

  createProject(Project: CreateProjectDto) {
    return this.projectsRepository.createProject(Project);
  }

  updateProject(id: string, Project: UpdateProjectDto) {
    return this.projectsRepository.updateProject(id, Project);
  }

  deleteProject(id: string) {
    return this.projectsRepository.deleteProject(id);
  }
}
