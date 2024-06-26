import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateNewsInput {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  title: string

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  text: string

  @ApiProperty({
    type: 'number',
    description: 'Category Id',
  })
  @IsNumber()
  @IsOptional()
  categoryId: number

  @ApiProperty({
    type: 'number',
    isArray: true,
    required: false,
    description: 'Array of tag IDs',
  })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  tags: number[]
}
