import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from 'src/entities/team.entity';
import { Repository } from 'typeorm';
import { CreateTeamDto, UpdateTeamDto } from './team.dto';
import { Role } from 'src/helpers/roles.enum.';

@Injectable()
export class TeamRepository {
  constructor(
    @InjectRepository(Team) private readonly teamRepository: Repository<Team>,
  ) {}

  async getTeam() {
    let Team = await this.teamRepository.find({
      relations: { image: true },
    });
    Team = Team.filter((Faqs) => Faqs.visible);
    return Team;
  }

  async getMemberById(id: string, user) {
    const member = await this.teamRepository.findOne({
      where: { id },
      relations: { image: true },
    });
    if (!member) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }
    if (member.visible === false) {
      if (user && user.role === Role.Admin) {
        return member;
      }
      throw new BadRequestException('This member is no longer available');
    }
    return member;
  }

  async addMember(member: CreateTeamDto) {
    const existingMember = await this.teamRepository.findOne({
      where: { name: member.name },
    });
    if (existingMember) {
      throw new BadRequestException(
        `A member with the name '${member.name}' already exists.`,
      );
    }
    const newMember = this.teamRepository.create(member);
    try {
      return await this.teamRepository.save(newMember);
    } catch (error) {
      throw new BadRequestException(`Error creating member: ${error.message}`);
    }
  }

  async updateMember(id: string, member: UpdateTeamDto) {
    const updateMember = await this.teamRepository.findOneBy({ id });
    if (!updateMember)
      throw new NotFoundException(`member whit ${id} not found`);
    await this.teamRepository.update(id, member);
    return updateMember;
  }

  async deleteMember(id: string) {
    const member = await this.teamRepository.findOneBy({ id });
    if (!member) throw new NotFoundException(`member whit ${id} not found`);
    if (member.visible === false)
      throw new BadRequestException('This member was no longer available');
    member.visible = false;
    await this.teamRepository.save(member);
    return member;
  }
}
