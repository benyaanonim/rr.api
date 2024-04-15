import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NewsService } from './news.service'
import { News } from './domain/news.entity'
import { AwsService } from '../aws/aws.service'
import { NewsController } from './api/news.controller'
import { NewsRepo } from './infrastructure/news.repo'
import { NewsQueryRepo } from './infrastructure/news.query-repo'
import { TagQueryRepo } from '../tag/infrastructure/tag.query-repo'
import { CategoryQueryRepo } from '../category/infrastructure/category.query-repo'
import { Source } from './domain/source.entity'

@Module({
  imports: [TypeOrmModule.forFeature([News, Source])],
  providers: [NewsService, AwsService, NewsRepo, NewsQueryRepo, TagQueryRepo, CategoryQueryRepo],
  controllers: [NewsController],
})
export class NewsModule {}
