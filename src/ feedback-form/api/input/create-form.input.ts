import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFormInput {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name of the person submitting the form',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Surname of the person submitting the form',
  })
  surname: string;

  @IsEmail()
  @ApiProperty({
    description: 'Email address of the person submitting the form',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Text content of the feedback form',
  })
  text: string;
}
