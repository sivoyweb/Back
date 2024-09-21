import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Disability } from 'src/entities/disabilities.entity';
import { categorizedDisabilities } from 'src/utils/discapacities'; // es el array a subir en la base de datos
import { Repository } from 'typeorm';

@Injectable()
export class DataSeederService implements OnModuleInit {
  constructor(
    @InjectRepository(Disability)
    private readonly disabilityRepository: Repository<Disability>,
  ) {}
  async onModuleInit() {
    await this.dataSeederDiscapacities();
  }

  async dataSeederDiscapacities() {
    for (const category of categorizedDisabilities) {
      for (const disabilityName of category.disabilities) {
        // Verificar si ya existe una discapacidad con el mismo nombre y categoría
        const exists = await this.disabilityRepository.findOne({
          where: {
            name: disabilityName,
            category: category.category,
          },
        });

        // Si no existe, crear y guardar en la base de datos
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
}
