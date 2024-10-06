import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "src/entities/projects.entity";
import { Repository } from "typeorm";
import { CreateProjectDto, UpdateProjectDto } from "./project.dto";
import { User } from "src/entities/user.entity";
import { Role } from "src/helpers/roles.enum.";

@Injectable()
export class ProjectsRepository {
  constructor(
    @InjectRepository(Project) private readonly projectsRepository: Repository<Project>,
  ) {}
  
    async getProjects() {
        let projects = await this.projectsRepository.find();
        projects = projects.filter((projects) => projects.visible);
        return projects;
    }

    async getProjectById(id: string, user: User) {
        const project = await this.projectsRepository.findOne({
            where: { id },
          });
          if (!project) {
            throw new NotFoundException(`project with ID ${id} not found`);
          }
          if (project.visible === false) {
            if (user && user.role === Role.Admin) {
              return project;
            }
            throw new BadRequestException('This project is no longer available');
          }
          return project;
    }

    async createProject(Project: CreateProjectDto) {
        const newProject = this.projectsRepository.create(Project);
        try {
          return await this.projectsRepository.save(newProject);
        } catch (error) {
          throw new BadRequestException(
            `Error creating project: ${error.message}`,
          );
        }
    }

    async updateProject(id: string, Project: UpdateProjectDto) {
        const updateProject = await this.projectsRepository.findOneBy({ id });
        if (!updateProject)
          throw new NotFoundException(`project whit ${id} not found`);
        await this.projectsRepository.update(id, Project);
        return updateProject;
    }

    async deleteProject(id: string) {
        const project = await this.projectsRepository.findOneBy({ id });
        if (!project) throw new NotFoundException(`project whit ${id} not found`);
        if (project.visible === false)
          throw new BadRequestException('This project was no longer available');
        project.visible = false;
        await this.projectsRepository.save(project);
        return project;
    }

}