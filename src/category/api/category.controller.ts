import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
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
import { Actor } from '../../common/decorators/actor.decrator';

@ApiTags('Category')
@Controller('categories')
export class CategoryController {
  constructor(
    protected readonly categoryService: CategoryService,
    protected readonly categoryQueryRepo: CategoryQueryRepo,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, type: [Category], isArray: true })
  async getCategories(): Promise<Category[]> {
    return this.categoryQueryRepo.getCategories();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category by id' })
  @ApiResponse({ status: 200, type: Category })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async getCategoryById(@Param('id') id: number): Promise<Category> {
    const category = await this.categoryQueryRepo.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category with this ID: ${id} was not found`);
    }
    return category;
  }

  @Post()
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({ type: CategoryCreateInput })
  @ApiResponse({ status: 201, type: Category })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createCategory(
    @Body() input: CategoryCreateInput,
    @Actor() actor,
  ): Promise<Category> {
    return this.categoryService.createCategory(input, actor.sub);
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
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async updateCategory(
    @Param('id') id: number,
    @Body() input: CategoryUpdateInput,
  ): Promise<Category> {
    const category = await this.categoryService.updateCategory(id, input);
    if (!category) {
      throw new NotFoundException(`Category with this ID: ${id} was not found`);
    }
    return null;
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
    const isDeleted = await this.categoryService.deleteCategory(id);
    if (!isDeleted) {
      throw new NotFoundException(`Category with this ID: ${id} was not found`);
    }
    return isDeleted;
  }
}
