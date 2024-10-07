import { Injectable } from '@nestjs/common';
import { AlliancesRepository } from './alliances.repository';
import { CreateAllianceDto, UpdateAllianceDto } from './alliances.dto';

@Injectable()
export class AlliancesService {
  constructor(private readonly alliancesRepository: AlliancesRepository) {}

  getAllAlliances() {
    return this.alliancesRepository.getAllAlliances();
  }

  getAllianceById(id: string) {
    return this.alliancesRepository.getAllianceById(id);
  }

  createAlliance(alliance: CreateAllianceDto) {
    return this.alliancesRepository.createAlliance(alliance);
  }

  updateAlliance(id: string, alliance: UpdateAllianceDto) {
    return this.alliancesRepository.updateAlliance(id, alliance);
  }

  deleteAlliance(id: string) {
    return this.alliancesRepository.deleteAlliance(id);
  }

  restoreAlliance(id: string) {
    return this.alliancesRepository.restoreAlliance(id);
  }
}
