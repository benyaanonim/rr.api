import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateNewsInput {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  text: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  categories: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  tags: number[];

  @IsOptional()
  image: Express.Multer.File;
}
