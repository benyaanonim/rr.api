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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NewsQueryRepo } from '../infrastructure/news.query-repo';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(
    protected readonly newsService: NewsService,
    protected readonly newsQueryRepo: NewsQueryRepo,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all news' })
  @ApiResponse({ status: 200, description: 'Return all news', type: [News] })
  async getNews(): Promise<News[]> {
    return this.newsQueryRepo.getNews();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get news by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'News ID' })
  @ApiResponse({ status: 200, description: 'Return news by ID', type: News })
  @ApiResponse({ status: 404, description: 'News not found' })
  async getNewsById(@Param('id') id: number) {
    return this.newsQueryRepo.getNewsById(id);
  }

  @Get('tag/:tagId')
  @ApiOperation({ summary: 'Get news by tag' })
  @ApiParam({ name: 'tagId', type: 'number', description: 'Tag ID' })
  @ApiResponse({ status: 200, description: 'Return news by tag', type: [News] })
  async getNewsByTag(@Param('tagId') tagId: number): Promise<News[]> {
    return this.newsQueryRepo.getNewsByTag(tagId);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Create news' })
  @ApiBody({ type: CreateNewsInput })
  @ApiResponse({ status: 400, description: 'Bad request' })
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
  @ApiOperation({ summary: 'Update news' })
  @ApiParam({ name: 'id', type: 'number', description: 'News ID' })
  @ApiBody({ type: UpdateNewsInput })
  @ApiResponse({ status: 200, description: 'News updated', type: News })
  @ApiResponse({ status: 404, description: 'News not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async updateNews(
    @Param('id') id: number,
    @Body() input: UpdateNewsInput,
    @UploadedFile() file,
  ): Promise<News> {
    input.image = file;
    return this.newsService.updateNews(id, input);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete news' })
  @ApiParam({ name: 'id', type: 'number', description: 'News ID' })
  @ApiResponse({ status: 204, description: 'News deleted' })
  @ApiResponse({ status: 404, description: 'News not found' })
  async deleteNews(@Param('id') id: number): Promise<News> {
    return this.newsService.deleteNews(id);
  }
}