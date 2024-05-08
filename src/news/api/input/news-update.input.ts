import { IsNotEmpty, IsArray, IsOptional, IsNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateNewsInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  title: string | null

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  text: string | null

  @ApiProperty({
    type: 'number',
    isArray: true,
    required: false,
    description: 'Array of category IDs',
  })
  @IsNumber()
  @IsOptional()
  categoryId: number | null

  @ApiProperty({
    type: 'number',
    isArray: true,
    required: false,
    description: 'Array of tag IDs',
  })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  tags: number[] | null
}
