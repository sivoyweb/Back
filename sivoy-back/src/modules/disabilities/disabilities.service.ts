import { Injectable } from '@nestjs/common';
import { DisabilitiesRepository } from './disabilities.repository';
import { addDisabilityDto, UpdateDisabilityDto } from './disabilities.dto';

@Injectable()
export class DisabilitiesService {
  constructor(
    private readonly disabilitiesRepository: DisabilitiesRepository,
  ) {}

  async getDisabilities() {
    return await this.disabilitiesRepository.getDisabilities();
  }

  async getDisabilityById(id: string) {
    return await this.disabilitiesRepository.getDisabilityById(id);
  }

  async addDisability(disabilityData: addDisabilityDto) {
    return await this.disabilitiesRepository.addDisability(disabilityData);
  }
  async modifyDisability(disabilityData: UpdateDisabilityDto, id: string) {
    return await this.disabilitiesRepository.modifyDisability(
      disabilityData,
      id,
    );
  }
  async removeDisability(id: string) {
    return await this.disabilitiesRepository.removeDisability(id);
  }
}
