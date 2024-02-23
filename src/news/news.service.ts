import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { News } from './domain/news.entity';
import { CreateNewsInput } from './api/input/news-create.input';
import { AwsService } from '../aws/aws.service';
import { UpdateNewsInput } from './api/input/news-update.input';
import { extractFileName } from '../helpers';
import { NewsRepo } from './infrastructure/news.repo';
import { TagQueryRepo } from '../tag/infrastructure/tag.query-repo';
import { CategoryQueryRepo } from '../category/infrastructure/category.query-repo';

@Injectable()
export class NewsService {
  constructor(
    protected readonly aws: AwsService,
    protected readonly newsRepo: NewsRepo,
    protected readonly tagQueryRepo: TagQueryRepo,
    protected readonly categoryQueryRepo: CategoryQueryRepo,
  ) {}

  async createNews(input: CreateNewsInput) {
    const image = await this.aws.uploadFile(await input.image);
    const newNews = new News();
    newNews.title = input.title;
    newNews.text = input.text;
    newNews.publicationDate = new Date();
    newNews.image = image;
    newNews.sources = input.sources;
    newNews.tags = await this.tagQueryRepo.find(input.tags);
    newNews.categories = await this.categoryQueryRepo.find(input.categories);
    return await this.newsRepo.save(newNews);
  }

  async updateNews(id: number, input: UpdateNewsInput) {
    const news = await this.newsRepo.findOne(id);

    if (!news) {
      throw new NotFoundException(`News with ID: ${id} not found`);
    }

    const image = await this.aws.uploadFile(await input.image);
    news.title = input.title;
    news.text = input.text;
    news.image = image;
    news.sources = input.sources;
    news.tags = await this.tagQueryRepo.find(input.tags);
    news.categories = await this.categoryQueryRepo.find(input.categories);

    return this.newsRepo.save(news);
  }

  async deleteNews(id: number) {
    const news = await this.newsRepo.findOne(id);
    if (!news) {
      throw new NotFoundException(`News with ID: ${id} not found`);
    }
    const fileName = extractFileName(news.image);
    const deleteResult = await this.newsRepo.delete(id);
    if (deleteResult.affected === 0) {
      throw new InternalServerErrorException(
        `Failed to delete news with ID: ${id}`,
      );
    }
    await this.aws.deleteImage(fileName);
    return news;
  }
}
