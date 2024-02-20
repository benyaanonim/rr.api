import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from '../category.service';
import { Category } from '../domain/category.entity';
import { CategoryCreateInput } from './input/category-create.input';
import { CategoryUpdateInput } from './input/category-update.input';

@Controller('categories')
export class CategoryController {
  constructor(protected readonly categoryService: CategoryService) {}

  @Get()
  async getCategories(): Promise<Category[]> {
    return this.categoryService.getCategories();
  }

  @Post()
  async createCategory(@Body() input: CategoryCreateInput): Promise<Category> {
    return this.categoryService.createCategory(input);
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: number,
    @Body() input: CategoryUpdateInput,
  ): Promise<Category> {
    return this.categoryService.updateCategory(id, input);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
