import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { News } from '../domain/news.entity';
import { Tag } from '../../tag/domain/tag.entity';

@Injectable()
export class NewsQueryRepo {
  constructor(protected readonly em: EntityManager) {}

  async getNews() {
    return this.em.find(News, { relations: ['tags', 'categories'] });
  }

  async getNewsById(id: number) {
    const news = await this.em.findOne(News, {
      where: { id },
      relations: ['tags', 'category'],
    });

    if (!news) {
      throw new NotFoundException(`News with ID: ${id} not found`);
    }

    await this.em.increment(News, { id }, 'viewCount', 1);

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
      throw new NotFoundException(`Tag with this ID: ${tagId} was not found `);
    }
    return this.em
      .createQueryBuilder(News, 'news')
      .leftJoinAndSelect('news.tags', 'tag')
      .where('tag.id = :tagId', { tagId: tagId })
      .getMany();
  }
}
