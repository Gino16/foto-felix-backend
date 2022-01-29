import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageRepository } from 'db/repositories/image.repository';
import { Image } from 'db/entities/image.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ImageRepository) private imageRepository: ImageRepository,
  ) {}

  async getImageById(id: number): Promise<Image> {
    const image = await this.imageRepository.findOne({
      where: { id },
      relations: ['category', 'client'],
    });
    if (!image) {
      throw new NotFoundException(`Image with id "${id}" not found`);
    }
    image.imgUrl = `${image.imgUrl}`;
    return image;
  }

  async createOrUpdateTask(image: Image): Promise<Image> {
    return this.imageRepository.save(image);
  }

  async findAll(): Promise<Image[]> {
    const images = this.imageRepository.find({
      relations: ['category', 'client'],
      order: { id: 'ASC' },
    });
    (await images).map((image) => {
      image.imgUrl = `${image.imgUrl}`;
    });
    return images;
  }

  async searchImage(image: Image): Promise<Image[]> {
    let where: any;
    if (image.category && image.client) {
      where = {
        category: image.category,
        client: image.client,
      };
    } else if (image.category) {
      where = {
        category: image.category,
      };
    } else if (image.client) {
      where = {
        client: image.client,
      };
    } else {
      where = {};
    }

    const images = this.imageRepository.find({
      where: where,
      relations: ['category', 'client'],
      order: { id: 'ASC' },
    });
    (await images).map((image) => {
      image.imgUrl = `${image.imgUrl}`;
    });
    return images;
  }

  async deleteTask(id: number): Promise<void> {
    await this.imageRepository.delete(id);
  }
}
