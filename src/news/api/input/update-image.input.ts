import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateImageInput {
  @ApiProperty({
    description: 'News image',
    type: 'file',
    required: true,
  })
  @IsNotEmpty()
  image: Express.Multer.File
}
