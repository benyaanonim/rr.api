import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { Gender } from '../../domain/deputy.entity'
import { ApiProperty } from '@nestjs/swagger'

export class CreateDeputyInput {
  @ApiProperty({ description: 'Name of the deputy' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ description: 'Surname of the deputy' })
  @IsString()
  @IsNotEmpty()
  surname: string

  @ApiProperty({ description: 'patronymic of the deputy' })
  @IsString()
  @IsNotEmpty()
  patronymic: string

  @ApiProperty({ description: 'Method of election' })
  @IsBoolean()
  @IsNotEmpty()
  majoritarian: boolean

  @ApiProperty({
    description: 'Birthday of the deputy',
    type: 'string',
    format: 'date',
  })
  @IsDateString()
  @IsNotEmpty()
  birthday: Date

  @ApiProperty({ description: 'Description of the deputy' })
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiProperty({ description: 'Gender of the deputy', enum: Gender })
  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender

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
