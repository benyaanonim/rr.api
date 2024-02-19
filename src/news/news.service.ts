import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, In } from 'typeorm';
import { News } from './domain/news.entity';
import { InputId } from '../common/input/input-id';
import { CreateNewsInput } from './graphql/input/news-create.input';
import { AwsService } from '../aws/aws.service';
import { UpdateNewsInput } from './graphql/input/news-update.input';
import { extractFileName } from '../helpers';
import { Category } from '../category/domain/category.entity';
import { Tag } from '../tag/domain/tag.entity';
import process from 'process';

@Injectable()
export class NewsService {
  constructor(
    protected readonly em: EntityManager,
    protected readonly aws: AwsService,
  ) {}

  async getNews() {
    return this.em.find(News, { relations: ['tags', 'categories'] });
  }

  async getNewsById(input: InputId) {
    const news = await this.em.findOne(News, {
      where: { id: input.id },
      relations: ['tags', 'categories'],
    });

    if (!news) {
      throw new NotFoundException(`News with ID: ${input.id} not found`);
    }

    await this.em.increment(News, { id: input.id }, 'viewCount', 1);
    return news;
  }

  async getNewsByTag(input: InputId) {
    return this.em
      .createQueryBuilder(News, 'news')
      .leftJoinAndSelect('news.tags', 'tag')
      .where('tag.id = :tagId', { tagId: input.id })
      .getMany();
  }

  async createNews(input: CreateNewsInput) {
    const image = await this.aws.uploadFile(await input.image);
    const newNews = new News();
    newNews.title = input.title;
    newNews.text = input.text;
    newNews.publicationDate = new Date();
    newNews.image = image;
    newNews.tags = await this.em.find(Tag, { where: { id: In(input.tags) } });
    newNews.categories = await this.em.find(Category, {
      where: { id: In(input.categories) },
    });
    return await this.em.save(newNews);
  }

  async updateNews(input: UpdateNewsInput) {
    const news = await this.em.findOne(News, { where: { id: input.id } });

    if (!news) {
      throw new NotFoundException(`News with ID: ${input.id} not found`);
    }

    const image = await this.aws.uploadFile(await input.image);
    news.title = input.title;
    news.text = input.text;
    news.image = image;
    news.tags = await this.em.find(Tag, { where: { id: In(input.tags) } });
    news.categories = await this.em.find(Category, {
      where: { id: In(input.categories) },
    });

    return this.em.save(news);
  }

  async deleteNews(input: InputId) {
    const news = await this.em.findOne(News, { where: { id: input.id } });
    if (!news) {
      throw new NotFoundException(`News with ID: ${input.id} not found`);
    }
    const fileName = extractFileName(news.image);

    await this.aws.deleteImage(fileName);
    await this.em.delete(News, { where: { id: input.id } });
    return news;
  }
}
