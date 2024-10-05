import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Disability } from 'src/entities/disabilities.entity';
import { Image } from 'src/entities/images.entity';
import { Promotion } from 'src/entities/promotion.entity';
import { Travel } from 'src/entities/travel.entity';
import {
  categorizedDisabilities,
  promotionsMock,
  travelsMock,
} from 'src/utils/precarga';
import { Repository } from 'typeorm';

@Injectable()
export class DataSeederService implements OnModuleInit {
  constructor(
    @InjectRepository(Disability)
    private readonly disabilityRepository: Repository<Disability>,
    @InjectRepository(Travel)
    private readonly travelRepository: Repository<Travel>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    @InjectRepository(Promotion)
    private readonly promotionRepository: Repository<Promotion>,
  ) {}
  async onModuleInit() {
    await this.dataSeederDiscapacities();
    await this.dataSeederTravels();
    await this.dataSeederPromotions();
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
      // Busca si el viaje ya existe
      const travelfound = await this.travelRepository.findOne({
        where: { name: travel.name },
      });

      if (travelfound) {
        continue;
      }

      // Precargar las imágenes
      const imagePromises = travel.images.map(async (imageData) => {
        // Crea la entidad de imagen
        const image = this.imageRepository.create({
          ...imageData,
          alt: imageData.publicId,
        });
        // Guarda la imagen y retorna la entidad guardada
        return await this.imageRepository.save(image);
      });

      // Esperar que todas las imágenes se hayan guardado
      const savedImages = await Promise.all(imagePromises);

      // Crear el nuevo viaje con las imágenes precargadas
      const newTravel: Partial<Travel> = {
        ...travel,
        images: savedImages, // Asigna las imágenes precargadas
      };

      // Crea y guarda el nuevo viaje
      const travelEntity = this.travelRepository.create(newTravel);
      await this.travelRepository.save(travelEntity);
    }
  }
  async dataSeederPromotions() {
    for (const promotion of promotionsMock) {
      try {
        const promotionFound = await this.promotionRepository.findOne({
          where: { name: promotion.name },
        });
        if (promotionFound) {
          continue;
        }

        // Crear y guardar las imágenes si no lo has hecho ya
        const images = promotion.images.map((image) =>
          this.imageRepository.create({ ...image, alt: image.publicId }),
        );
        await this.imageRepository.save(images);

        // Asignar las imágenes a la promoción
        const newPromotion = this.promotionRepository.create({
          ...promotion,
          images,
        });

        await this.promotionRepository.save(newPromotion);
      } catch (error) {
        console.error(
          `Error precargando la promoción: ${promotion.name}`,
          error,
        );
      }
    }
  }
}
