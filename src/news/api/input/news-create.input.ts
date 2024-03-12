import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty({
    type: 'string',
    isArray: true,
    required: false,
    description: 'Array of sources',
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  sources: string[];

  @ApiProperty({
    type: 'number',
    description: 'Category Id',
  })
  @IsNumber()
  @IsOptional()
  categoryId: number;

  @ApiProperty({
    type: 'number',
    isArray: true,
    required: false,
    description: 'Array of tag IDs',
  })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  tags: number[];

  @ApiProperty({ type: 'file', format: 'binary', description: 'Image file' })
  @IsOptional()
  image: Express.Multer.File;
}
