import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class HallCreateInput {
  @ApiProperty({ description: 'Hall name', example: 'The Verkhovna Rada' })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({ description: 'Number of seats in the hall', example: '450' })
  @IsNotEmpty()
  @IsNumber()
  numberOfPlaces: number
}
