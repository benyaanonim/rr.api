import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryUpdateInput {
  @IsNotEmpty()
  @IsString()
  name: string;
}
