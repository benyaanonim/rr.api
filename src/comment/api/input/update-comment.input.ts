import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateCommentInput {
  @ApiProperty({ description: 'Text of the comment', type: String })
  @IsNotEmpty()
  text: string
}
