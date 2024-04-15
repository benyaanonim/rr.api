import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
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
import { SourceCreateInput } from './input/source-create.input'
import { UpdateImageInput } from './input/update-image.input'
import { NewsViewModel } from './output/news.view.model'

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(
    protected readonly newsService: NewsService,
    protected readonly newsQueryRepo: NewsQueryRepo,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all news' })
  @ApiResponse({ status: 200, description: 'Return all news', type: [NewsViewModel] })
  async getNews(): Promise<NewsViewModel[]> {
    return this.newsQueryRepo.getNews()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get news by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'News ID' })
  @ApiResponse({ status: 200, description: 'Return news by ID', type: NewsViewModel })
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
  @ApiResponse({ status: 200, description: 'Return news by tag', type: [NewsViewModel] })
  async getNewsByTag(@Param('tagId') tagId: number): Promise<NewsViewModel[]> {
    const news = await this.newsQueryRepo.getNewsByTag(tagId)
    if (!news) {
      throw new NotFoundException(`Tag with this ID: ${tagId} was not found`)
    }
    return news
  }

  @Post()
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create news' })
  @ApiBody({ type: CreateNewsInput })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createNews(
    @Body()
    input: CreateNewsInput,
  ): Promise<News> {
    return this.newsService.createNews(input)
  }

  @Post(':newsId/source')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiBody({ type: SourceCreateInput })
  @ApiOperation({ summary: 'Create news source' })
  @ApiResponse({ status: 404, description: 'News not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createSource(@Body() input: SourceCreateInput, @Param('newsId') newsId: number) {
    const result = await this.newsService.createSource(newsId, input)
    if (!result) {
      throw new NotFoundException(`News with ID: ${newsId} not found`)
    }
    return result
  }

  @Delete(':newsId/source/:id')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete news source' })
  @ApiResponse({ status: 404, description: 'News not found' })
  async deleteSource(@Param('newsId') newsId: number, @Param('id') id: number) {
    const result = await this.newsService.deleteSource(newsId, id)
    if (!result) {
      throw new NotFoundException(`News with ID: ${newsId} not found`)
    }
    return result
  }

  @Put(':newsId/update-image')
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor('image'))
  @ApiBearerAuth()
  @ApiBody({ type: UpdateImageInput })
  @ApiConsumes('multipart/form-data')
  async updateNewsImage(@Param('newsId') newsId: number, @UploadedFile() file: Express.Multer.File) {
    console.log(newsId)
    const result = await this.newsService.updateNewsImage(newsId, file)
    if (!result) {
      throw new NotFoundException(`News with ID: ${newsId} not found`)
    }
    return result
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Update news' })
  @ApiParam({ name: 'id', type: 'number', description: 'News ID' })
  @ApiBody({ type: UpdateNewsInput })
  @ApiResponse({ status: 200, description: 'News updated', type: News })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'News not found' })
  async updateNews(@Param('id') id: number, @Body() input: UpdateNewsInput): Promise<News> {
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
