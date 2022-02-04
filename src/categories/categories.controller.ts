import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Category } from 'db/entities/category.entity';
import { CategoriesService } from './categories.service';

@Controller('categories')
@UseGuards(AuthGuard())
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get('/search/:id')
  getCategoryById(@Param('id') id: number) {
    return this.categoriesService.getCategoryById(id);
  }

  @Get('/search')
  searchCategory(@Query() query) {
    let name = '';
    if (
      query.name != null &&
      query.name != '' &&
      query.name != undefined &&
      query.name != 'undefined'
    ) {
      name = query.name;
    }
    return this.categoriesService.searchCategory(name);
  }
  @Post()
  createOrUpdateCategory(@Body() category: Category) {
    if (category.name != '') {
      category.name = category.name.toLowerCase();
    } else {
      return;
    }
    return this.categoriesService.createOrUpdateCategory(category);
  }

  @Delete('/:id')
  deleteCategory(@Param('id') id: number) {
    return this.categoriesService.deleteCategory(id);
  }
}
