import { Injectable } from '@nestjs/common';
import { ImagesRepository } from './images.repository';
import { AddImageDto, UpdateImageDto } from './image.dto';

@Injectable()
export class ImagesService {
  constructor(private readonly imagesRepository: ImagesRepository) {}

  async getAll() {
    try {
      return await this.imagesRepository.getAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  async addImage(imageData: AddImageDto) {
    try {
      return await this.imagesRepository.addimage(imageData);
    } catch (error) {
      throw new Error(error);
    }
  }
  async removeImage(id: string) {
    try {
      return await this.imagesRepository.removeImage(id);
    } catch (error) {
      throw new Error(error);
    }
  }
  async activeImage(id: string) {
    try {
      return await this.imagesRepository.activeImage(id);
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateImage(id: string, imageData: UpdateImageDto) {
    try {
      return await this.imagesRepository.updateImage(id, imageData);
    } catch (error) {
      throw new Error(error);
    }
  }
  async getImageById(id: string) {
    try {
      return await this.imagesRepository.getImageById(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
