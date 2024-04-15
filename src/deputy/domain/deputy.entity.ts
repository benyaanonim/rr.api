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
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  majoritarian: boolean

  @Column()
  name: string

  @Column()
  surname: string

  @Column({ nullable: true })
  patronymic: string | null

  @Column({ nullable: true, default: null })
  photo: string | null

  @Column({ nullable: true, default: null })
  background: string | null

  @Column({ type: 'timestamp' })
  birthday: Date

  @Column()
  description: string

  @Column({ type: 'enum', enum: Gender })
  gender: Gender

  @ManyToOne(() => Party, (party) => party.deputies, { nullable: true })
  party: Party | null

  @OneToOne(() => Property, { nullable: true, cascade: true })
  @JoinColumn()
  property: Property | null

  @OneToOne(() => Rating, { nullable: true, cascade: true })
  @JoinColumn()
  rating: Rating | null

  @OneToMany(() => OtherInfo, (otherInfo) => otherInfo.deputy, { nullable: true, cascade: true })
  otherInfo: OtherInfo[] | null
}
