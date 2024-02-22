import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, In } from 'typeorm';
import { News } from './domain/news.entity';
import { CreateNewsInput } from './app/input/news-create.input';
import { AwsService } from '../aws/aws.service';
import { UpdateNewsInput } from './app/input/news-update.input';
import { Category } from '../category/domain/category.entity';
import { Tag } from '../tag/domain/tag.entity';
import { extractFileName } from '../helpers';

@Injectable()
export class NewsService {
  constructor(
    protected readonly em: EntityManager,
    protected readonly aws: AwsService,
  ) {}

  async getNews() {
    return this.em.find(News, { relations: ['tags', 'categories'] });
  }

  async getNewsById(id: number) {
    const news = await this.em.findOne(News, {
      where: { id: id },
      relations: ['tags', 'categories'],
    });

    if (!news) {
      throw new NotFoundException(`News with ID: ${id} not found`);
    }

    await this.em.increment(News, { id: id }, 'viewCount', 1);

    const categoryIds = news.categories.map((category) => category.id);

    const relatedNews = await this.em
      .createQueryBuilder(News, 'relatedNews')
      .leftJoinAndSelect('relatedNews.categories', 'category')
      .where('category.id IN (:...categoryIds)', { categoryIds })
      .andWhere('relatedNews.id != :newsId', { newsId: id })
      .orderBy('relatedNews.publicationDate', 'DESC')
      .take(2)
      .getMany();

    return {
      news,
      relatedNews,
    };
  }

  async getNewsByTag(tagId: number) {
    return this.em
      .createQueryBuilder(News, 'news')
      .leftJoinAndSelect('news.tags', 'tag')
      .where('tag.id = :tagId', { tagId: tagId })
      .getMany();
  }

  async createNews(input: CreateNewsInput) {
    const image = await this.aws.uploadFile(await input.image);
    const newNews = new News();
    newNews.title = input.title;
    newNews.text = input.text;
    newNews.publicationDate = new Date();
    newNews.image = image;
    newNews.sources = input.sources;
    newNews.tags = await this.em.find(Tag, { where: { id: In(input.tags) } });
    newNews.categories = await this.em.find(Category, {
      where: { id: In(input.categories) },
    });
    return await this.em.save(newNews);
  }

  async updateNews(id: number, input: UpdateNewsInput) {
    const news = await this.em.findOne(News, { where: { id: id } });

    if (!news) {
      throw new NotFoundException(`News with ID: ${id} not found`);
    }

    const image = await this.aws.uploadFile(await input.image);
    news.title = input.title;
    news.text = input.text;
    news.image = image;
    news.sources = input.sources;
    news.tags = await this.em.find(Tag, { where: { id: In(input.tags) } });
    news.categories = await this.em.find(Category, {
      where: { id: In(input.categories) },
    });

    return this.em.save(news);
  }

  async deleteNews(id: number) {
    const news = await this.em.findOne(News, { where: { id: id } });
    if (!news) {
      throw new NotFoundException(`News with ID: ${id} not found`);
    }
    const fileName = extractFileName(news.image);

    await this.aws.deleteImage(fileName);
    await this.em.delete(News, { where: { id: id } });
    return news;
  }
}
