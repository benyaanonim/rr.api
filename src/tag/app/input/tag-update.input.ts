import { IsNotEmpty, IsString } from 'class-validator';

export class TagUpdateInput {
  @IsString()
  @IsNotEmpty()
  name: string;
}
