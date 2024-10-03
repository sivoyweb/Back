import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from 'src/entities/images.entity';
import { Repository } from 'typeorm';
import { AddImageDto, UpdateImageDto } from './image.dto';

@Injectable()
export class ImagesRepository {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async addimage(imageData: AddImageDto) {
    const imageFound = await this.imageRepository.findOne({
      where: { publicId: imageData.publicId },
    });
    if (imageFound) {
      throw new HttpException(
        {
          status: 400,
          error: 'public-id already exist',
        },
        400,
      );
    }

    const newImage = this.imageRepository.create(imageData);
    await this.imageRepository.save(newImage);
    return newImage;
  }

  async removeImage(id: string) {
    const image = await this.imageRepository.findOne({ where: { id } });
    if (!image) {
      throw new HttpException({ status: 404, error: 'image not found' }, 404);
    }
    await this.imageRepository.update(id, { active: false });
    return 'image removed';
  }

  async activeImage(id: string) {
    const image = await this.imageRepository.findOne({ where: { id } });
    if (!image) {
      throw new HttpException({ status: 404, error: 'image not found' }, 404);
    }
    await this.imageRepository.update(id, { active: true });
    return 'image actived';
  }

  async getImageById(id: string) {
    const image = await this.imageRepository.findOne({
      where: { id },
      select: ['alt', 'url', 'active', 'url'],
    });
    if (!image) {
      throw new HttpException({ status: 404, error: 'image not found' }, 404);
    }
    return image;
  }

  async getAll() {
    const image = await this.imageRepository.find({
      select: ['alt', 'url', 'active', 'url'],
    });
    return image;
  }

  async updateImage(id: string, imageData: UpdateImageDto) {
    const image = await this.imageRepository.findOne({
      where: { id },
      select: ['alt', 'url', 'active', 'url'],
    });
    if (!image) {
      throw new HttpException({ status: 404, error: 'image not found' }, 404);
    }
    await this.imageRepository.update(id, { ...imageData });
    return image;
  }
}
