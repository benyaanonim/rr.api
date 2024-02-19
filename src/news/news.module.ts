import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsResolver } from './graphql/news.resolver';
import { NewsService } from './news.service';
import { News } from './domain/news.entity';
import { AwsService } from '../aws/aws.service';

@Module({
  imports: [TypeOrmModule.forFeature([News])],
  providers: [NewsResolver, NewsService, AwsService],
})
export class NewsModule {}
