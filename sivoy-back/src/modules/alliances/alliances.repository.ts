import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alliance } from 'src/entities/alliances.entity';
import { Repository } from 'typeorm';
import { CreateAllianceDto, UpdateAllianceDto } from './alliances.dto';

@Injectable()
export class AlliancesRepository {
  constructor(
    @InjectRepository(Alliance)
    private readonly allianceRepository: Repository<Alliance>,
  ) {}

  async getAllAlliances() {
    let alliances = await this.allianceRepository.find({
      relations: {
        image: true,
      },
    });
    alliances = alliances.filter((alliances) => alliances.visible);
    return alliances;
  }

  async getAllianceById(id: string) {
    const alliance = await this.allianceRepository.findOne({
      where: { id },
      relations: {
        image: true,
      },
    });
    if (!alliance) {
      throw new NotFoundException(`Alliance with ID ${id} not found`);
    }
    return alliance;
  }

  async createAlliance(alliance: CreateAllianceDto) {
    const existingAlliance = await this.allianceRepository.findOne({
      where: { name: alliance.name },
    });
    if (existingAlliance) {
      throw new BadRequestException(
        `A Alliance with the name '${alliance.name}' already exists.`,
      );
    }
    const newBlog = this.allianceRepository.create(alliance);
    try {
      return await this.allianceRepository.save(newBlog);
    } catch (error) {
      throw new BadRequestException(
        `Error creating alliance: ${error.message}`,
      );
    }
  }

  async updateAlliance(id: string, alliance: UpdateAllianceDto) {
    const updateAlliance = await this.allianceRepository.findOneBy({ id });
    if (!updateAlliance)
      throw new NotFoundException(`alliance whit ${id} not found`);
    await this.allianceRepository.update(id, alliance);
    return updateAlliance;
  }

  async deleteAlliance(id: string) {
    const alliance = await this.allianceRepository.findOneBy({ id });
    if (!alliance) throw new NotFoundException(`alliance whit ${id} not found`);
    if (alliance.visible === false)
      throw new BadRequestException('This alliance was no longer available');
    alliance.visible = false;
    await this.allianceRepository.save(alliance);
    return alliance;
  }

  async restoreAlliance(id: string) {
    const alliance = await this.allianceRepository.findOneBy({ id });
    if (!alliance) throw new NotFoundException(`alliance with ${id} not found`);
    if (alliance.visible === true)
      throw new BadRequestException('This alliance is already visible');
    alliance.visible = true;
    await this.allianceRepository.save(alliance);
    return alliance;
  }
}
