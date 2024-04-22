import { IsNotEmpty, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateCommentInput {
  @ApiProperty({ description: 'Text of the comment', type: String })
  @IsNotEmpty()
  text: string

  @ApiProperty({ description: 'Parent comment ID if any', type: Number, required: false })
  @IsOptional()
  parentId: number | null

  @ApiProperty({ description: 'ID of the deputy the comment is related to', type: Number })
  @IsNotEmpty()
  deputyId: number
}
