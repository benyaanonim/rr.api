import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateOtherInfoInput {
  @ApiProperty({ description: 'Name of the other info' })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({ description: 'Description of the other info', type: [String] })
  @IsNotEmpty()
  @IsString({ each: true })
  description: string[]
}
