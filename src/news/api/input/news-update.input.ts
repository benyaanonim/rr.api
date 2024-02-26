import {
  IsNotEmpty,
  IsArray,
  IsOptional,
  IsNumber,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNewsInput {
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
    isArray: true,
    required: false,
    description: 'Array of category IDs',
  })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  categories: number[];

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

  @ApiProperty({ type: 'string', format: 'binary', description: 'Image file' })
  @IsOptional()
  image: Express.Multer.File;
}
