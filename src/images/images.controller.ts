import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Image } from 'db/entities/image.entity';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private imageService: ImagesService) {}

  @Get()
  findAll() {
    return this.imageService.findAll();
  }

  @Get('/search/:id')
  getImageById(@Param('id') id: number) {
    return this.imageService.getImageById(id);
  }

  @Get('/search')
  searchImage(@Body() image: Image) {
    return this.imageService.searchImage(image);
  }
  @Post()
  createTask(@Body() image: Image) {
    return this.imageService.createOrUpdateTask(image);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: number) {
    return this.imageService.deleteTask(id);
  }
}
