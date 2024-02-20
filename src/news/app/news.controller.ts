import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { NewsService } from '../news.service';
import { News } from '../domain/news.entity';
import { CreateNewsInput } from './input/news-create.input';
import { UpdateNewsInput } from './input/news-update.input';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('news')
export class NewsController {
  constructor(protected readonly newsService: NewsService) {}

  @Get()
  async getNews(): Promise<News[]> {
    return this.newsService.getNews();
  }

  @Get(':id')
  async getNewsById(@Param('id') id: number): Promise<News> {
    return this.newsService.getNewsById(id);
  }

  @Get('tag/:tagId')
  async getNewsByTag(@Param('tagId') tagId: number): Promise<News[]> {
    return this.newsService.getNewsByTag(tagId);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createNews(
    @Body() input: CreateNewsInput,
    @UploadedFile() file,
  ): Promise<News> {
    input.image = file;
    return this.newsService.createNews(input);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async updateNews(
    @Param('id') id: number,
    @Body() input: UpdateNewsInput,
    @UploadedFile() file,
  ): Promise<News> {
    input.image = file;
    return this.newsService.updateNews(id, input);
  }

  @Delete(':id')
  async deleteNews(@Param('id') id: number): Promise<News> {
    return this.newsService.deleteNews(id);
  }
}
