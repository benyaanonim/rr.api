import { Injectable } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { News } from '../domain/news.entity'
import { Source } from '../domain/source.entity'

@Injectable()
export class NewsRepo {
  constructor(protected readonly em: EntityManager) {}

  async findOne(newsId: number) {
    return this.em.findOne(News, { where: { id: newsId } })
  }

  async save(entity: News | Source) {
    return this.em.save(entity)
  }

  async delete(newsId: number) {
    return this.em.delete(News, { where: { id: newsId } })
  }

  async deleteSource(sourceId: number) {
    return this.em.delete(Source, { where: { id: sourceId } })
  }
}
