import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'db/entities/category.entity';
import { CategoryRepository } from 'db/repositories/category.repository';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) { }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find({ order: { id: 'ASC' } });
  }

  async createOrUpdateCategory(category: Category): Promise<Category> {
    return await this.categoryRepository.save(category);
  }
}
