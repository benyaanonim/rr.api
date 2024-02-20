import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TagCreateInput {
  @ApiProperty({
    description: 'Name of the tag',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
