import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryCreateInput {
  @IsNotEmpty()
  @IsString()
  name: string;
}
