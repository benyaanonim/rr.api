import { IsBoolean, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateStatusFormInput {
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ description: 'Feedback form status' })
  status: boolean
}
