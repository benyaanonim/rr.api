import { Body, Controller, Ip, NotFoundException, Post } from '@nestjs/common'
import { LikeService } from '../like.service'
import { LikeInputModel } from './like.input.model'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Like')
@Controller('like')
export class LikeController {
  constructor(protected readonly likeService: LikeService) {}

  @Post()
  @ApiBody({ type: LikeInputModel })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  async processLike(@Body() input: LikeInputModel, @Ip() ip: string) {
    const result = await this.likeService.processLike(input, ip)
    if (!result) {
      throw new NotFoundException(`Comment for id: ${input.commentId} not found`)
    }
    return result
  }
}
