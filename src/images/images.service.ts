import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageRepository } from 'db/repositories/image.repository';
import { Image } from 'db/entities/image.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ImageRepository) private imageRepository: ImageRepository,
  ) { }

  async getImageById(id: number): Promise<Image> {
    const image = await this.imageRepository.findOne({
      where: { id },
      relations: ['category', 'client'],
    });
    if (!image) {
      throw new NotFoundException(`Image with id "${id}" not found`);
    }
    return image;
  }

  async createOrUpdateTask(image: Image): Promise<Image> {
    return this.imageRepository.save(image);
  }

  async findAll(): Promise<Image[]> {
    return this.imageRepository.find({ relations: ['category', 'client'], order: { id: 'ASC' } });
  }
}
