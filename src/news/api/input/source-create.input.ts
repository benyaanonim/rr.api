import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class SourceCreateInput {
  @ApiProperty({ type: 'string', description: 'source name' })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({ type: 'string', description: 'source value' })
  @IsNotEmpty()
  @IsString()
  value: string
}
