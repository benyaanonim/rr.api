import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from '../category.service';
import { Category } from '../domain/category.entity';
import { CategoryCreateInput } from './input/category-create.input';
import { CategoryUpdateInput } from './input/category-update.input';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryQueryRepo } from '../infrastructure/category.query-repo';
import { AdminGuard } from '../../common/guard/auth.guard';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(
    protected readonly categoryService: CategoryService,
    protected readonly categoryQueryRepo: CategoryQueryRepo,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, type: Category, isArray: true })
  async getCategories(): Promise<Category[]> {
    return this.categoryQueryRepo.getCategories();
  }

  @Post()
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({ type: CategoryCreateInput })
  @ApiResponse({ status: 201, type: Category })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createCategory(@Body() input: CategoryCreateInput): Promise<Category> {
    return this.categoryService.createCategory(input);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a category' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The id of the category to update',
  })
  @ApiBody({ type: CategoryUpdateInput })
  @ApiResponse({ status: 200, type: Category })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async updateCategory(
    @Param('id') id: number,
    @Body() input: CategoryUpdateInput,
  ): Promise<Category> {
    return this.categoryService.updateCategory(id, input);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a category' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The id of the category to delete',
  })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async deleteCategory(@Param('id') id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
