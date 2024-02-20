import { IsNotEmpty, IsString } from 'class-validator';

export class TagCreateInput {
  @IsString()
  @IsNotEmpty()
  name: string;
}
