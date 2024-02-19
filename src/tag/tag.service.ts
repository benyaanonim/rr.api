import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Tag } from './domain/tag.entity';
import { TagCreateInput } from './graphql/input/tag-create.input';
import { TagUpdateInput } from './graphql/input/tag-update.input';
import { InputId } from '../common/input/input-id';

@Injectable()
export class TagService {
  constructor(protected readonly em: EntityManager) {}

  async getTags() {
    return this.em.find(Tag);
  }

  async createTag(input: TagCreateInput) {
    const tag = this.em.create(Tag, { ...input });
    return this.em.save(tag);
  }

  async updateTag(input: TagUpdateInput) {
    const tag = await this.em.findOne(Tag, { where: { id: input.id } });

    if (!tag) {
      throw new NotFoundException(`Tag with ID: ${input.id} not found`);
    }

    tag.name = input.name;
    return this.em.save(tag);
  }

  async deleteTag(input: InputId) {
    return this.em.delete(Tag, { where: { id: input.id } });
  }
}
