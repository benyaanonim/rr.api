import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Tag } from './domain/tag.entity';
import { TagCreateInput } from './app/input/tag-create.input';
import { TagUpdateInput } from './app/input/tag-update.input';
@Injectable()
export class TagService {
  constructor(protected readonly em: EntityManager) {}

  async getTags() {
    return this.em.find(Tag);
  }

  async createTag(input: TagCreateInput) {
    const tag = this.em.create(Tag, { link: input.link, name: input.name });
    return this.em.save(tag);
  }

  async updateTag(id: number, input: TagUpdateInput) {
    const tag = await this.em.findOne(Tag, { where: { id: id } });

    if (!tag) {
      throw new NotFoundException(`Tag with ID: ${id} not found`);
    }

    tag.name = input.name;
    tag.link = input.link;
    return this.em.save(tag);
  }

  async deleteTag(id: number) {
    return this.em.delete(Tag, { where: { id: id } });
  }
}
