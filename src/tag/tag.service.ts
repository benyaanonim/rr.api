import { Injectable, NotFoundException } from '@nestjs/common';
import { Tag } from './domain/tag.entity';
import { TagCreateInput } from './api/input/tag-create.input';
import { TagUpdateInput } from './api/input/tag-update.input';
import { TagRepo } from './infrastructure/tag.repo';
@Injectable()
export class TagService {
  constructor(protected readonly tagRepo: TagRepo) {}

  async createTag(input: TagCreateInput) {
    const tag = new Tag();
    tag.name = input.name;
    tag.link = input.link;
    return this.tagRepo.save(tag);
  }

  async updateTag(id: number, input: TagUpdateInput) {
    const tag = await this.tagRepo.findOne(id);
    if (!tag) {
      throw new NotFoundException(`Tag with ID: ${id} not found`);
    }

    tag.name = input.name;
    tag.link = input.link;
    return this.tagRepo.save(tag);
  }

  async deleteTag(id: number) {
    const isDeleted = await this.tagRepo.delete(id);
    if (!isDeleted.affected) {
      throw new NotFoundException(`Tag with ID: ${id} not found`);
    }
    return isDeleted;
  }
}
