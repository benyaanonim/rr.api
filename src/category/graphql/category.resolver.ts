import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from '../category.service';
import { Category } from '../domain/category.entity';
import { CategoryCreateInput } from './input/category-create.input';
import { CategoryUpdateInput } from './input/category-update.input';
import { InputId } from '../../common/input/input-id';

@Resolver()
export class CategoryResolver {
  constructor(protected readonly categoryService: CategoryService) {}
  @Query(() => [Category])
  async getCategories() {
    return this.categoryService.getCategories();
  }

  @Mutation(() => Category)
  async createCategory(@Args('input') input: CategoryCreateInput) {
    return this.categoryService.createCategory(input);
  }

  @Mutation(() => Category)
  async updateCategory(@Args('input') input: CategoryUpdateInput) {
    return this.categoryService.updateCategory(input);
  }

  @Mutation(() => Category)
  async deleteCategory(@Args('input') input: InputId) {
    return this.categoryService.deleteCategory(input);
  }
}
