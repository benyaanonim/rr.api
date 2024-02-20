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
