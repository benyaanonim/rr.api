import { Comment } from '../../domain/comment.entity'
import { ApiProperty } from '@nestjs/swagger'

export class CommentViewModel {
  @ApiProperty({ description: 'Comment id' })
  id: number

  @ApiProperty({ description: 'Comment text' })
  text: string

  @ApiProperty({ description: 'Comment created date' })
  createdAt: string

  @ApiProperty({ description: 'Comment likes count' })
  likeCount: number

  @ApiProperty({ description: 'Comment parent id' })
  parentId: number

  @ApiProperty({ description: 'Comment deputy id' })
  deputyId: number
  constructor(comment: Comment) {
    this.id = comment.id
    this.text = comment.text
    this.createdAt = comment.createdAt.toLocaleString('ru-Ru')
    this.likeCount = comment.likeCount
    this.deputyId = comment.deputyId
    this.parentId = comment.parentId
  }
}
