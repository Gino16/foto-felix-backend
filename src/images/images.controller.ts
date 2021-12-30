import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Image } from 'db/entities/image.entity';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private imageService: ImagesService) {}

  @Get()
  findAll() {
    return this.imageService.findAll();
  }

  @Get('/:id')
  getImageById(@Param('id') id: number) {
    return this.imageService.getImageById(id);
  }

  @Post()
  createTask(@Body() image: Image) {
    return this.imageService.createOrUpdateTask(image);
  }
}
