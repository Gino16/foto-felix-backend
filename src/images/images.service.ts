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
    let newImage = await this.imageRepository.save(image);
    let newFinalImage = this.getImageById(newImage.id);
    return newFinalImage;
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

  async searchImage(categoryId, clientId): Promise<Image[]> {
    let where: any;
    if (categoryId && clientId) {
      where = {
        category: categoryId,
        client: clientId,
      };
    } else if (categoryId) {
      where = {
        category: categoryId,
      };
    } else if (clientId) {
      where = {
        client: clientId,
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
