import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Party } from '../../party/domain/party.entity'
import { Property } from './deputy-property.entity'
import { OtherInfo } from './other-info.entity'
import { Rating } from './rating.entity'
import { DeputyTag } from './deputy-tag.entity'
import { Place } from '../../hall/domain/place.entity'

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

  @Column({ name: 'job_title', nullable: true })
  jobTitle: string | null

  @Column({ name: 'state_level', nullable: true })
  stateLevel: string | null

  @Column()
  name: string

  @Column()
  surname: string

  @Column({ nullable: true })
  patronymic: string | null

  @Column({ nullable: true, default: null, type: 'simple-array' })
  photo: string[] | null

  @Column({ nullable: true, default: null })
  background: string | null

  @Column({ nullable: true })
  birthday: string | null

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

  @ManyToMany(() => DeputyTag, (deputyTag) => deputyTag.deputy, { nullable: true })
  @JoinTable()
  deputyTag: DeputyTag[] | null

  @OneToOne(() => Place, (place) => place.deputy, { nullable: true, cascade: true })
  place: Place
}
