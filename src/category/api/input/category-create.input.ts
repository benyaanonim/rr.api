import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CategoryCreateInput {
  @ApiProperty({
    description: 'Name of the category',
  })
  @IsNotEmpty()
  @IsString()
  name: string
}
