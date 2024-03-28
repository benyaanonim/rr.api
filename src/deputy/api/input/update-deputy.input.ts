import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { Gender } from '../../domain/deputy.entity'

export class UpdateDeputyInput {
  @ApiProperty({ description: 'Name of the deputy', required: false })
  @IsString()
  @IsOptional()
  name: string | null

  @ApiProperty({ description: 'Surname of the deputy', required: false })
  @IsString()
  @IsOptional()
  surname: string | null

  @ApiProperty({
    description: 'Birthday of the deputy',
    type: 'string',
    format: 'date',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  birthday: Date | null

  @ApiProperty({ description: 'Description of the deputy', required: false })
  @IsString()
  @IsOptional()
  description: string | null

  @ApiProperty({
    description: 'Gender of the deputy',
    enum: Gender,
    required: false,
  })
  @IsEnum(Gender)
  @IsOptional()
  gender: Gender | null

  @ApiProperty({
    description: 'Photo of the deputy',
    type: 'file',
    required: false,
  })
  @IsOptional()
  photo: Express.Multer.File | null

  @ApiProperty({
    description: 'Background image of the deputy',
    type: 'file',
    required: false,
  })
  @IsOptional()
  background: Express.Multer.File | null

  @ApiProperty({ description: 'Party ID of the deputy', required: false })
  @IsNumber()
  @IsOptional()
  partyId: number | null

  @ApiProperty({ description: 'Savings of the deputy', required: false, type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  savings: string[] | null

  @ApiProperty({ description: 'Other properties of the deputy', required: false, type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  other: string[] | null

  @ApiProperty({ description: 'Real estate of the deputy', required: false, type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  realEstate: string[] | null

  @ApiProperty({ description: 'Cars of the deputy', required: false, type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  cars: string[] | null

  @ApiProperty({ description: 'Business of the deputy', required: false, type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  business: string[] | null
}
