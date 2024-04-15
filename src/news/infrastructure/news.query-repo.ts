import { Injectable } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { News } from '../domain/news.entity'
import { Tag } from '../../tag/domain/tag.entity'
import { NewsViewModel } from '../api/output/news.view.model'

@Injectable()
export class NewsQueryRepo {
  constructor(protected readonly em: EntityManager) {}

  async getNews() {
    try {
      const news = await this.em.find(News, { relations: ['tags', 'category', 'sources'] })
      console.log(news)
      return news.map((n) => new NewsViewModel(n))
    } catch (err) {
      console.log(err)
      return null
    }
  }

  async getNewsById(id: number) {
    const news = await this.em.findOne(News, {
      where: { id: id },
      relations: ['tags', 'category', 'sources'],
    })

    if (!news) {
      return null
    }

    await this.em.increment(News, { id: id }, 'viewCount', 1)

    if (!news.category) {
      return news
    }

    const categoryId = news.category.id
    const relatedNews = await this.em
      .createQueryBuilder(News, 'relatedNews')
      .leftJoinAndSelect('relatedNews.category', 'category')
      .where('category.id = :categoryId', { categoryId })
      .andWhere('relatedNews.id != :newsId', { newsId: id })
      .orderBy('relatedNews.publicationDate', 'DESC')
      .take(2)
      .getMany()

    return { news: new NewsViewModel(news), relatedNews: relatedNews.map((rn) => new NewsViewModel(rn)) }
  }

  async getNewsByTag(tagId: number) {
    const tag = await this.em.findOne(Tag, { where: { id: tagId } })
    if (!tag) {
      return null
    }
    const news = await this.em
      .createQueryBuilder(News, 'news')
      .leftJoinAndSelect('news.tags', 'tag')
      .leftJoinAndSelect('news.category', 'category')
      .leftJoinAndSelect('news.sources', 'sources')
      .where('tag.id = :tagId', { tagId: tagId })
      .getMany()

    return news.map((n) => new NewsViewModel(n))
  }
}
