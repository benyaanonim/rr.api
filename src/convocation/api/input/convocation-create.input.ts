import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ConvocationCreateInput {
  @ApiProperty({ type: 'string', description: 'Convocation name' })
  @IsString()
  @IsNotEmpty()
  name: string
}
