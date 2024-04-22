import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common'
import { CreateCommentInput } from './input/create-comment.input'
import { CommentService } from '../comment.sevice'
import { UpdateCommentInput } from './input/update-comment.input'
import { Comment } from '../domain/comment.entity'
import { CommentQueryRepo } from '../infrastructure/comment.query-repo'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CommentViewModel } from './output/comment.view.model'

@ApiTags('Comments')
@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly commentQueryRepo: CommentQueryRepo,
  ) {}

  @Get('/:deputyId')
  @ApiOperation({ summary: 'Fetch comments by deputyId' })
  @ApiResponse({ status: 200, type: [CommentViewModel] })
  @ApiResponse({ status: 404 })
  async getComments(@Param('deputyId') deputyId: number) {
    const comments = await this.commentQueryRepo.find(deputyId)
    if (!comments) {
      throw new NotFoundException('Deputy not found')
    }
    return comments
  }

  @Post()
  @ApiOperation({ summary: 'Create a comment' })
  @ApiResponse({ status: 200, description: 'Creation successful', type: CommentViewModel })
  @ApiResponse({ status: 404 })
  @ApiBody({ type: CreateCommentInput })
  async create(@Body() input: CreateCommentInput) {
    const result = await this.commentService.create(input)
    if (!result) {
      throw new NotFoundException('Comment not found')
    }
    return result
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update a comment' })
  @ApiResponse({ status: 200, description: 'Updating successful', type: CommentViewModel })
  @ApiBody({ type: UpdateCommentInput })
  async updateComment(@Param('id') id: number, @Body() input: UpdateCommentInput): Promise<Comment> {
    const comment = await this.commentService.update(id, input)
    if (!comment) {
      throw new NotFoundException('Comment not found')
    }
    return comment
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a comment' })
  @ApiResponse({ status: 200, description: 'Deleting successful' })
  async deleteComment(@Param('id') id: number): Promise<void> {
    const isDeleted = await this.commentService.delete(id)
    if (!isDeleted) {
      throw new NotFoundException('Comment not found')
    }
  }
}
