import { Injectable } from '@nestjs/common';
import { EntityManager, In } from 'typeorm';
import { Tag } from '../../tag/domain/tag.entity';
import { Category } from '../domain/category.entity';

@Injectable()
export class CategoryQueryRepo {
  constructor(protected readonly em: EntityManager) {}

  async getCategories() {
    return this.em.find(Category);
  }

  async find(categoriesIds: number[]) {
    return this.em.find(Tag, { where: { id: In(categoriesIds) } });
  }

  async findOne(categoryId: number) {
    return this.em.findOneOrFail(Category, { where: { id: categoryId } });
  }
}
