import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { News } from './domain/news.entity'
import { CreateNewsInput } from './api/input/news-create.input'
import { AwsService } from '../aws/aws.service'
import { UpdateNewsInput } from './api/input/news-update.input'
import { NewsRepo } from './infrastructure/news.repo'
import { TagQueryRepo } from '../tag/infrastructure/tag.query-repo'
import { CategoryQueryRepo } from '../category/infrastructure/category.query-repo'

@Injectable()
export class NewsService {
  constructor(
    protected readonly aws: AwsService,
    protected readonly newsRepo: NewsRepo,
    protected readonly tagQueryRepo: TagQueryRepo,
    protected readonly categoryQueryRepo: CategoryQueryRepo,
  ) {}

  async createNews(input: CreateNewsInput) {
    const image = await this.aws.uploadFile(await input.image)
    const newNews = new News()
    newNews.title = input.title
    newNews.text = input.text
    newNews.publicationDate = new Date()
    newNews.image = image
    newNews.sources = input.sources
    newNews.tags = await this.tagQueryRepo.find(input.tags)
    newNews.category = await this.categoryQueryRepo.findOne(input.categoryId)
    return await this.newsRepo.save(newNews)
  }

  async updateNews(id: number, input: UpdateNewsInput) {
    const news = await this.newsRepo.findOne(id)

    if (!news) {
      return null
    }

    if (input.image) {
      if (news.image) {
        await this.aws.deleteImage(news.image)
      }
      news.image = await this.aws.uploadFile(await input.image)
    }

    news.title = input.title ?? news.title
    news.text = input.text ?? news.text
    news.sources = input.sources ?? news.sources
    news.tags = (await this.tagQueryRepo.find(input.tags)) ?? news.tags
    news.category = (await this.categoryQueryRepo.findOne(input.categoryId)) ?? news.category

    return this.newsRepo.save(news)
  }

  async deleteNews(id: number) {
    const news = await this.newsRepo.findOne(id)
    if (!news) {
      return null
    }
    try {
      await this.aws.deleteImage(news.image)
      await this.newsRepo.delete(id)
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException(`Failed to delete news with ID: ${id}`)
    }
    return news
  }
}
