import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsService } from './news.service';
import { News } from './domain/news.entity';
import { AwsService } from '../aws/aws.service';
import { NewsController } from './app/news.controller';

@Module({
  imports: [TypeOrmModule.forFeature([News])],
  providers: [NewsService, AwsService],
  controllers: [NewsController],
})
export class NewsModule {}
