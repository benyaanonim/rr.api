import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { News } from '../domain/news.entity';

@Injectable()
export class NewsQueryRepo {
  constructor(protected readonly em: EntityManager) {}

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
}
