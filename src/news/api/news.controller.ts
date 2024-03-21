import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { NewsService } from '../news.service'
import { News } from '../domain/news.entity'
import { CreateNewsInput } from './input/news-create.input'
import { UpdateNewsInput } from './input/news-update.input'
import { FileInterceptor } from '@nestjs/platform-express'
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { NewsQueryRepo } from '../infrastructure/news.query-repo'
import { AdminGuard } from '../../common/guard/auth.guard'

@ApiTags('News')
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
    return this.newsQueryRepo.getNews()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get news by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'News ID' })
  @ApiResponse({ status: 200, description: 'Return news by ID', type: News })
  @ApiResponse({ status: 404, description: 'News not found' })
  async getNewsById(@Param('id') id: number) {
    const news = await this.newsQueryRepo.getNewsById(id)
    if (!news) {
      throw new NotFoundException(`News with ID: ${id} not found`)
    }
    return news
  }

  @Get('tag/:tagId')
  @ApiOperation({ summary: 'Get news by tag' })
  @ApiParam({ name: 'tagId', type: 'number', description: 'Tag ID' })
  @ApiResponse({ status: 200, description: 'Return news by tag', type: [News] })
  async getNewsByTag(@Param('tagId') tagId: number): Promise<News[]> {
    const news = await this.newsQueryRepo.getNewsByTag(tagId)
    if (!news) {
      throw new NotFoundException(`Tag with this ID: ${tagId} was not found`)
    }
    return news
  }

  @Post()
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor('image'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create news' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateNewsInput })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createNews(
    @Body()
    input: CreateNewsInput,
    @UploadedFile() file,
  ): Promise<News> {
    input.image = file
    return this.newsService.createNews(input)
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Update news' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', type: 'number', description: 'News ID' })
  @ApiBody({ type: UpdateNewsInput })
  @ApiResponse({ status: 200, description: 'News updated', type: News })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'News not found' })
  async updateNews(
    @Param('id') id: number,
    @Body() input: UpdateNewsInput,
    @UploadedFile() file?,
  ): Promise<News> {
    input.image = file
    const news = await this.newsService.updateNews(id, input)
    if (!news) {
      throw new NotFoundException(`News with ID: ${id} not found`)
    }
    return news
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete news' })
  @ApiParam({ name: 'id', type: 'number', description: 'News ID' })
  @ApiResponse({ status: 204, description: 'News deleted' })
  @ApiResponse({ status: 404, description: 'News not found' })
  async deleteNews(@Param('id') id: number): Promise<News> {
    const isDeleted = await this.newsService.deleteNews(id)
    if (!isDeleted) {
      throw new NotFoundException(`News with ID: ${id} not found`)
    }
    return isDeleted
  }
}
