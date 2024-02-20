import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Category } from './domain/category.entity';
import { CategoryCreateInput } from './app/input/category-create.input';
import { CategoryUpdateInput } from './app/input/category-update.input';

@Injectable()
export class CategoryService {
  constructor(protected readonly em: EntityManager) {}
  async getCategories() {
    return this.em.find(Category);
  }

  async createCategory(input: CategoryCreateInput) {
    const category = this.em.create(Category, { name: input.name });
    return this.em.save(category);
  }

  async updateCategory(id: number, input: CategoryUpdateInput) {
    const category = await this.em.findOne(Category, {
      where: { id: id },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID: ${id} not found`);
    }

    category.name = input.name;
    return this.em.save(category);
  }

  async deleteCategory(id: number) {
    const category = await this.em.findOne(Category, {
      where: { id: id },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID: ${id} not found`);
    }

    return this.em.delete(Category, { where: { id: id } });
  }
}
