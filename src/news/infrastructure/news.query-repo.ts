import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { News } from '../domain/news.entity';
import { Tag } from '../../tag/domain/tag.entity';

@Injectable()
export class NewsQueryRepo {
  constructor(protected readonly em: EntityManager) {}

  async getNews() {
    return this.em.find(News, { relations: ['tags', 'category'] });
  }

  async getNewsById(id: number) {
    const news = await this.em.findOne(News, {
      where: { id: id },
      relations: ['tags', 'category'],
    });

    if (!news) {
      return null;
    }

    await this.em.increment(News, { id: id }, 'viewCount', 1);

    if (!news.category) {
      return news;
    }

    const categoryId = news.category.id;
    const relatedNews = await this.em
      .createQueryBuilder(News, 'relatedNews')
      .leftJoinAndSelect('relatedNews.category', 'category')
      .where('category.id = :categoryId', { categoryId })
      .andWhere('relatedNews.id != :newsId', { newsId: id })
      .orderBy('relatedNews.publicationDate', 'DESC')
      .take(2)
      .getMany();

    return { news, relatedNews };
  }

  async getNewsByTag(tagId: number) {
    const tag = await this.em.findOne(Tag, { where: { id: tagId } });
    if (!tag) {
      return null;
    }
    return this.em
      .createQueryBuilder(News, 'news')
      .leftJoinAndSelect('news.tags', 'tag')
      .where('tag.id = :tagId', { tagId: tagId })
      .getMany();
  }
}
