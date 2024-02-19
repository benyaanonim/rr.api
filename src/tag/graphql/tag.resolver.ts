import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Tag } from '../domain/tag.entity';
import { TagCreateInput } from './input/tag-create.input';
import { TagUpdateInput } from './input/tag-update.input';
import { InputId } from '../../common/input/input-id';
import { TagService } from '../tag.service';

@Resolver()
export class TagResolver {
  constructor(protected readonly tagService: TagService) {}

  @Query(() => [Tag])
  async getTags() {
    return this.tagService.getTags();
  }

  @Mutation(() => Tag)
  async createTag(@Args('input') input: TagCreateInput) {
    return this.tagService.createTag(input);
  }

  @Mutation(() => Tag)
  async updateTag(@Args('input') input: TagUpdateInput) {
    return this.tagService.updateTag(input);
  }

  @Mutation(() => Tag)
  async deleteTag(@Args('input') input: InputId) {
    return this.tagService.deleteTag(input);
  }
}
