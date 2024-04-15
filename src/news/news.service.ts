import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { News } from './domain/news.entity'
import { CreateNewsInput } from './api/input/news-create.input'
import { AwsService } from '../aws/aws.service'
import { UpdateNewsInput } from './api/input/news-update.input'
import { NewsRepo } from './infrastructure/news.repo'
import { TagQueryRepo } from '../tag/infrastructure/tag.query-repo'
import { CategoryQueryRepo } from '../category/infrastructure/category.query-repo'
import { SourceCreateInput } from './api/input/source-create.input'
import { Source } from './domain/source.entity'

@Injectable()
export class NewsService {
  constructor(
    protected readonly aws: AwsService,
    protected readonly newsRepo: NewsRepo,
    protected readonly tagQueryRepo: TagQueryRepo,
    protected readonly categoryQueryRepo: CategoryQueryRepo,
  ) {}

  async createNews(input: CreateNewsInput) {
    try {
      const newNews = new News()
      newNews.title = input.title
      newNews.text = input.text
      newNews.publicationDate = new Date()
      newNews.image = null
      newNews.sources = null
      newNews.tags = await this.tagQueryRepo.find(input.tags)
      newNews.category = await this.categoryQueryRepo.findOne(input.categoryId)
      return (await this.newsRepo.save(newNews)) as News
    } catch (err) {
      console.log(err)
      throw new InternalServerErrorException(`Failed to create news`)
    }
  }

  async updateNews(id: number, input: UpdateNewsInput) {
    try {
      const news = await this.newsRepo.findOne(id)
      if (!news) {
        return null
      }

      news.title = input.title ?? news.title
      news.text = input.text ?? news.text
      news.tags = (await this.tagQueryRepo.find(input.tags)) ?? news.tags
      news.category = (await this.categoryQueryRepo.findOne(input.categoryId)) ?? news.category

      return (await this.newsRepo.save(news)) as News
    } catch (err) {
      console.log(err)
      throw new InternalServerErrorException(`Failed to update news with ID: ${id}`)
    }
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

  async updateNewsImage(id: number, file: Express.Multer.File) {
    try {
      const news = await this.newsRepo.findOne(id)
      if (!news) {
        return null
      }
      if (news.image) {
        await this.aws.deleteImage(news.image)
      }
      news.image = await this.aws.uploadFile(file)
      return (await this.newsRepo.save(news)) as News
    } catch (err) {
      console.log(err)
      throw new InternalServerErrorException(`Failed to update image news ID: ${id}`)
    }
  }

  async createSource(id: number, input: SourceCreateInput) {
    try {
      const news = await this.newsRepo.findOne(id)
      if (!news) {
        return null
      }

      const newSource = new Source()
      newSource.name = input.name
      newSource.value = input.value
      newSource.news = news
      return this.newsRepo.save(newSource)
    } catch (err) {
      console.log(err)
      throw new InternalServerErrorException(`Failed to create source by news ID: ${id}`)
    }
  }

  async deleteSource(newsId: number, sourceId: number) {
    try {
      const news = await this.newsRepo.findOne(newsId)
      if (!news) {
        return null
      }
      return this.newsRepo.deleteSource(sourceId)
    } catch (err) {
      console.log(err)
      throw new InternalServerErrorException(`Failed to delete source with news ID: ${newsId}`)
    }
  }
}
