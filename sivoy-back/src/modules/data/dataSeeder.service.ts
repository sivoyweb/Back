import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Disability } from 'src/entities/disabilities.entity';
import { Travel } from 'src/entities/travel.entity';
import { categorizedDisabilities, travelsMock } from 'src/utils/precarga';
import { Repository } from 'typeorm';

@Injectable()
export class DataSeederService implements OnModuleInit {
  constructor(
    @InjectRepository(Disability)
    private readonly disabilityRepository: Repository<Disability>,
    @InjectRepository(Travel)
    private readonly travelRepository: Repository<Travel>,
  ) {}
  async onModuleInit() {
    await this.dataSeederDiscapacities();
    await this.dataSeederTravels();
  }

  async dataSeederDiscapacities() {
    for (const category of categorizedDisabilities) {
      for (const disabilityName of category.disabilities) {
        const exists = await this.disabilityRepository.findOne({
          where: {
            name: disabilityName,
            category: category.category,
          },
        });

        if (!exists) {
          const newDisability = this.disabilityRepository.create({
            name: disabilityName,
            category: category.category,
          });
          await this.disabilityRepository.save(newDisability);
        }
      }
    }
  }

  async dataSeederTravels() {
    for (const travel of travelsMock) {
      const travelfound = await this.travelRepository.findOne({
        where: { name: travel.name },
      });
      if (travelfound) {
        continue;
      }
      this.travelRepository.create(travel);
      await this.travelRepository.save(travel);
    }
  }
}
