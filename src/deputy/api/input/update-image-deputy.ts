import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'

export class UpdateImageDeputy {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  @IsOptional()
  photo: Express.Multer.File[] | null

  @ApiProperty({
    description: 'Background image of the deputy',
    type: 'file',
    required: false,
  })
  @IsOptional()
  background: Express.Multer.File | null
}
