import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { News } from './domain/news.entity';
import { InputId } from '../common/input/input-id';

@Injectable()
export class NewsService {
  constructor(protected readonly em: EntityManager) {}

  async getNews() {
    return this.em.find(News);
  }

  async getNewsById(input: InputId) {
    const news = await this.em.findOne(News, {
      where: { id: input.id },
      relations: ['tags'],
    });

    if (!news) {
      throw new NotFoundException(`News with ID: ${input.id} not found`);
    }

    await this.em.increment(News, { id: input.id }, 'viewCount', 1);
    return news;
  }
}
