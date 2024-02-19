import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NewsService } from '../news.service';
import { News } from '../domain/news.entity';
import { InputId } from '../../common/input/input-id';
import { CreateNewsInput } from './input/news-create.input';
import { UpdateNewsInput } from './input/news-update.input';

@Resolver()
export class NewsResolver {
  constructor(protected readonly newsService: NewsService) {}

  @Query(() => [News])
  async getNews() {
    return this.newsService.getNews();
  }

  @Query(() => News)
  async getNewsById(@Args('input') input: InputId) {
    return this.newsService.getNewsById(input);
  }

  @Query(() => [News])
  async getNewsByTag(@Args('input') input: InputId) {
    return this.newsService.getNewsByTag(input);
  }

  @Mutation(() => News)
  async createNews(@Args('input') input: CreateNewsInput) {
    return this.newsService.createNews(input);
  }

  @Mutation(() => News)
  async updateNews(@Args('input') input: UpdateNewsInput) {
    return this.newsService.updateNews(input);
  }

  @Mutation(() => News)
  async deleteNews(@Args('input') input: InputId) {
    return this.newsService.deleteNews(input);
  }
}
