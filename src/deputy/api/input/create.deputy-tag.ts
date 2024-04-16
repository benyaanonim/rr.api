import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateDeputyTag {
  @ApiProperty({ type: 'string', description: 'Deputy tag name' })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({ type: 'string', description: 'Deputy tag description' })
  @IsNotEmpty()
  @IsString()
  description: string
}
