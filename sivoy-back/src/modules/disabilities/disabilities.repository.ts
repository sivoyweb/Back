import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Disability } from 'src/entities/disabilities.entity';
import { Repository } from 'typeorm';
import { addDisabilityDto, UpdateDisabilityDto } from './disabilities.dto';

@Injectable()
export class DisabilitiesRepository {
  constructor(
    @InjectRepository(Disability)
    private readonly disabilitiesRepository: Repository<Disability>,
  ) {}

  async getDisabilities() {
    const disabilities = await this.disabilitiesRepository.find({
      where: { active: true },
    });

    return disabilities;
  }

  async getDisabilityById(id: string) {
    const disabilityFound = await this.disabilitiesRepository.findOne({
      where: { id },
    });

    if (!disabilityFound) {
      throw new HttpException(
        {
          status: 404,
          error: `disability with id ${id} does not exist`,
        },
        404,
      );
    }
    return disabilityFound;
  }

  async addDisability(disabilityData: addDisabilityDto) {
    const disabilityFound = await this.disabilitiesRepository.findOne({
      where: { name: disabilityData.name },
    });

    if (disabilityFound) {
      throw new HttpException(
        {
          status: 404,
          error: `disability with name ${disabilityData.name} already exist`,
        },
        404,
      );
    }

    const disability = this.disabilitiesRepository.create(disabilityData);
    await this.disabilitiesRepository.save(disability);
    return disability;
  }

  async modifyDisability(disabilityData: UpdateDisabilityDto, id: string) {
    const disabilityFound = await this.disabilitiesRepository.findOne({
      where: { id },
    });

    if (!disabilityFound) {
      throw new HttpException(
        { status: 404, error: 'disability not found' },
        404,
      );
    }

    await this.disabilitiesRepository.update(id, disabilityData);

    return 'success';
  }

  async removeDisability(id: string) {
    const disabilityFound = await this.disabilitiesRepository.findOne({
      where: { id },
    });

    if (!disabilityFound) {
      throw new HttpException(
        { status: 404, error: 'disability not found' },
        404,
      );
    }

    await this.disabilitiesRepository.update(id, { active: false });

    return 'removed';
  }
}
