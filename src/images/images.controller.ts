import { Controller, Get, Param } from '@nestjs/common';
import { Image } from 'db/entities/image.entity';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private imageService: ImagesService) { }

  @Get()
  findAll() {
    return this.imageService.findAll();
  }

  @Get('/:id')
  getImageById(@Param('id') id: number) {
    return this.imageService.getImageById(id);
  }
}
