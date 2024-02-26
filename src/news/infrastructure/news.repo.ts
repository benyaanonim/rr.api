import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { News } from '../domain/news.entity';

@Injectable()
export class NewsRepo {
  constructor(protected readonly em: EntityManager) {}

  async findOne(newsId: number) {
    return this.em.findOne(News, { where: { id: newsId } });
  }

  async save(news: News) {
    return this.em.save(news);
  }

  async delete(newsId: number) {
    return this.em.delete(News, { where: { id: newsId } });
  }
}
