import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TagService } from '../tag.service';
import { Tag } from '../domain/tag.entity';
import { TagCreateInput } from './input/tag-create.input';
import { TagUpdateInput } from './input/tag-update.input';

@Controller('tags')
export class TagController {
  constructor(protected readonly tagService: TagService) {}

  @Get()
  async getTags(): Promise<Tag[]> {
    return this.tagService.getTags();
  }

  @Post()
  async createTag(@Body() input: TagCreateInput): Promise<Tag> {
    return this.tagService.createTag(input);
  }

  @Put(':id')
  async updateTag(
    @Param('id') id: number,
    @Body() input: TagUpdateInput,
  ): Promise<Tag> {
    return this.tagService.updateTag(id, input);
  }

  @Delete(':id')
  async deleteTag(@Param('id') id: number) {
    return this.tagService.deleteTag(id);
  }
}
