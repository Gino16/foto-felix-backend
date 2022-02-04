import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Image } from 'db/entities/image.entity';

import { ImagesService } from './images.service';

@Controller('images')
@UseGuards(AuthGuard())
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
  searchImage(@Query() query) {
    if (query.categoryId && query.clientId) {
      return this.imageService.searchImage(query.categoryId, query.clientId);
    } else if (query.categoryId) {
      return this.imageService.searchImage(query.categoryId, null);
    } else if (query.clientId) {
      return this.imageService.searchImage(null, query.clientId);
    } else {
      return this.imageService.searchImage(null, null);
    }
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
