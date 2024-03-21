import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class ConvocationUpdateInput {
  @ApiProperty({ type: 'string', description: 'Convocation name' })
  @IsString()
  @IsNotEmpty()
  name: string
}
