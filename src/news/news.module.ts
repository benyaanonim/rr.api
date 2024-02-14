import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsResolver } from './graphql/news.resolver';
import { NewsService } from './news.service';
import { News, Tag } from './domain/news.entity';

@Module({
  imports: [TypeOrmModule.forFeature([News, Tag])],
  providers: [NewsResolver, NewsService],
})
export class NewsModule {}
