import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class PartyCreateInput {
  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiProperty({
    type: 'array',
    items: { type: 'number' },
    description: 'Array of Convocation ids',
  })
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  convocationIds: number[]

  @ApiProperty({ type: 'file', format: 'binary', description: 'Image file' })
  @IsOptional()
  logo: Express.Multer.File

  @ApiProperty({ type: 'file', format: 'binary', description: 'Image file' })
  @IsOptional()
  background: Express.Multer.File
}
