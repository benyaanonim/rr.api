import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class PartyUpdateInput {
  @ApiProperty({ type: 'string' })
  @IsString()
  @IsOptional()
  name: string | null;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsOptional()
  description: string | null;

  @ApiProperty({
    type: 'array',
    items: { type: 'number' },
    description: 'Array of Convocation ids',
  })
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  convocationIds: number[] | null;

  @ApiProperty({ type: 'file', format: 'binary', description: 'Image file' })
  @IsOptional()
  logo: Express.Multer.File | null;

  @ApiProperty({ type: 'file', format: 'binary', description: 'Image file' })
  @IsOptional()
  background: Express.Multer.File | null;
}
