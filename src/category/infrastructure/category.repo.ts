import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Category } from '../domain/category.entity';

@Injectable()
export class CategoryRepo {
  constructor(protected readonly em: EntityManager) {}

  async findOne(categoryId: number) {
    return this.em.findOne(Category, { where: { id: categoryId } });
  }

  async save(category: Category) {
    return this.em.save(category);
  }

  async delete(categoryId: number) {
    return this.em.delete(Category, { where: { id: categoryId } });
  }
}
