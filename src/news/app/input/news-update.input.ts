import { IsNotEmpty, IsArray, IsOptional, IsNumber } from 'class-validator';

export class UpdateNewsInput {
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
