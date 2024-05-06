import { IsNotEmpty, IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class TypeIdInput {
  @ApiProperty({ description: 'Deputy Id' })
  @IsNotEmpty()
  @IsNumber()
  id: number
}
