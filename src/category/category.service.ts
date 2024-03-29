import { Injectable } from '@nestjs/common'
import { Category } from './domain/category.entity'
import { CategoryCreateInput } from './api/input/category-create.input'
import { CategoryUpdateInput } from './api/input/category-update.input'
import { CategoryRepo } from './infrastructure/category.repo'

@Injectable()
export class CategoryService {
  constructor(protected readonly categoryRepo: CategoryRepo) {}
  async createCategory(input: CategoryCreateInput, adminName: string) {
    const category = new Category()
    category.name = input.name
    category.createdBy = adminName
    category.createdAt = new Date()
    return this.categoryRepo.save(category)
  }

  async updateCategory(id: number, input: CategoryUpdateInput) {
    const category = await this.categoryRepo.findOne(id)

    if (!category) {
      return null
    }

    category.name = input.name

    return this.categoryRepo.save(category)
  }

  async deleteCategory(id: number) {
    return this.categoryRepo.delete(id)
  }
}
