import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'db/entities/category.entity';
import { CategoryRepository } from 'db/repositories/category.repository';
import { Like } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find({ order: { id: 'ASC' } });
  }

  async createOrUpdateCategory(category: Category): Promise<Category> {
    return await this.categoryRepository.save(category);
  }

  async getCategoryById(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Category with id "${id}" not found`);
    }
    return category;
  }

  async searchCategory(name: string): Promise<Category[]> {
    return await this.categoryRepository.find({
      where: { name: Like(`%${name}%`) },
      order: { id: 'ASC' },
    });
  }

  async deleteCategory(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
