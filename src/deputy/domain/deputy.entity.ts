import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Party } from '../../party/domain/party.entity'

export enum Gender {
  male = 'male',
  female = 'female',
}

@Entity()
export class Deputy {
  @ApiProperty({ description: 'ID of the deputy' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ description: 'Name of the deputy' })
  @Column()
  name: string

  @ApiProperty({ description: 'Surname of the deputy' })
  @Column()
  surname: string

  @ApiProperty({ description: 'Photo URL of the deputy' })
  @Column()
  photo: string

  @ApiProperty({ description: 'Background image URL of the deputy' })
  @Column()
  background: string

  @ApiProperty({
    description: 'Birthday of the deputy',
    type: 'string',
    format: 'date-time',
  })
  @Column({ type: 'timestamp' })
  birthday: Date

  @ApiProperty({ description: 'Description of the deputy' })
  @Column()
  description: string

  @ApiProperty({ description: 'Gender of the deputy', enum: Gender })
  @Column({ type: 'enum', enum: Gender })
  gender: Gender

  @ApiProperty({
    description: 'Party associated with the deputy',
    type: Party,
    required: false,
  })
  @ManyToOne(() => Party, (party) => party.deputies, { nullable: true })
  party: Party | null
}
