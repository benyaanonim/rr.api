import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Party } from '../../party/domain/party.entity'
import { Property } from './deputy-property.entity'
import { OtherInfo } from './other-info.entity'
import { Rating } from './rating.entity'

export enum Gender {
  male = 'male',
  female = 'female',
}

@Entity()
export class Deputy {
  @ApiProperty({ description: 'ID of the deputy' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ description: 'Method of election' })
  @Column()
  majoritarian: boolean

  @ApiProperty({ description: 'Name of the deputy' })
  @Column()
  name: string

  @ApiProperty({ description: 'Surname of the deputy' })
  @Column()
  surname: string

  @ApiProperty({ description: 'Photo URL of the deputy' })
  @Column({ nullable: true, default: null })
  photo: string | null

  @ApiProperty({ description: 'Background image URL of the deputy' })
  @Column({ nullable: true, default: null })
  background: string | null

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

  @OneToOne(() => Property, { nullable: true, cascade: true })
  @JoinColumn()
  property: Property | null

  @ApiProperty({
    description: 'Rating deputy',
    type: Rating,
  })
  @OneToOne(() => Rating, { nullable: true, cascade: true })
  @JoinColumn()
  rating: Rating | null

  @OneToMany(() => OtherInfo, (otherInfo) => otherInfo.deputy, { nullable: true, cascade: true })
  otherInfo: OtherInfo[] | null
}
