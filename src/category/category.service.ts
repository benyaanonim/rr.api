import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Category } from './domain/category.entity';
import { CategoryCreateInput } from './graphql/input/category-create.input';
import { CategoryUpdateInput } from './graphql/input/category-update.input';
import { InputId } from '../common/input/input-id';

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

  async updateCategory(input: CategoryUpdateInput) {
    const category = await this.em.findOne(Category, {
      where: { id: input.id },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID: ${input.id} not found`);
    }

    category.name = input.name;
    return this.em.save(category);
  }

  async deleteCategory(input: InputId) {
    const category = await this.em.findOne(Category, {
      where: { id: input.id },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID: ${input.id} not found`);
    }

    return this.em.delete(Category, { where: { id: input.id } });
  }
}
