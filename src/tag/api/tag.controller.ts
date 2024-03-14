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
import { TagService } from '../tag.service';
import { Tag } from '../domain/tag.entity';
import { TagCreateInput } from './input/tag-create.input';
import { TagUpdateInput } from './input/tag-update.input';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TagQueryRepo } from '../infrastructure/tag.query-repo';
import { AdminGuard } from '../../common/guard/auth.guard';

@ApiTags('Tags')
@Controller('tags')
export class TagController {
  constructor(
    protected readonly tagService: TagService,
    protected readonly tagQueryRepo: TagQueryRepo,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all tags' })
  @ApiResponse({ status: 200, type: Tag, isArray: true })
  async getTags(): Promise<Tag[]> {
    return this.tagQueryRepo.getTags();
  }

  @Post()
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new tag' })
  @ApiBody({ type: TagCreateInput })
  @ApiResponse({ status: 201, type: Tag })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createTag(@Body() input: TagCreateInput): Promise<Tag> {
    return this.tagService.createTag(input);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a tag' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The id of the tag to update',
  })
  @ApiBody({ type: TagUpdateInput })
  @ApiResponse({ status: 200, type: Tag })
  @ApiResponse({ status: 404, description: 'Tag not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async updateTag(
    @Param('id') id: number,
    @Body() input: TagUpdateInput,
  ): Promise<Tag> {
    return this.tagService.updateTag(id, input);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a tag' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The id of the tag to delete',
  })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Tag not found' })
  async deleteTag(@Param('id') id: number) {
    return this.tagService.deleteTag(id);
  }
}
