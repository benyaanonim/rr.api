import { Args, Query, Resolver } from '@nestjs/graphql';
import { NewsService } from '../news.service';
import { News } from '../domain/news.entity';
import { InputId } from '../../common/input/input-id';

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
}
