import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class LikeInputModel {
  @ApiProperty({ description: 'Comment id for like' })
  @IsNotEmpty()
  commentId: number

  @ApiProperty({ description: 'Like status: true/false' })
  @IsNotEmpty()
  status: boolean
}
