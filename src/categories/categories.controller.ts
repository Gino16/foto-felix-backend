import { Controller, Post, Get, Body } from '@nestjs/common';
import { Category } from 'db/entities/category.entity';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) { }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Post()
  createOrUpdateCategory(@Body() category: Category) {
    return this.categoriesService.createOrUpdateCategory(category);
  }
}
