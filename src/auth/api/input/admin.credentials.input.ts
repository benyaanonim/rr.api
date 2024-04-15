import { ApiProperty } from '@nestjs/swagger'

export class AdminInput {
  @ApiProperty({ example: 'string', description: 'The name of the admin' })
  name: string

  @ApiProperty({
    example: 'string',
    description: 'The password of the admin',
  })
  password: string
}
