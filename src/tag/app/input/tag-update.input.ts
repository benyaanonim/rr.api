import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TagUpdateInput {
  @ApiProperty({
    description: 'Name of the tag',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Link to resource' })
  @IsUrl()
  @IsNotEmpty()
  link: string;
}
