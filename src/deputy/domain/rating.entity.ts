import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Deputy } from './deputy.entity'

@Entity()
export class Rating {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column()
  attendance: number

  @ApiProperty()
  @Column()
  education: number

  @ApiProperty({ name: 'feed_frequency' })
  @Column({ name: 'feed_frequency' })
  feedFrequency: number

  @ApiProperty({ name: 'corruption_risks' })
  @Column({ name: 'corruption_risks' })
  corruptionRisks: number

  @ApiProperty({ name: 'experience_in_politics' })
  @Column({ name: 'experience_in_politics' })
  experienceInPolitics: number

  @ApiProperty({ name: 'social_reach' })
  @Column({ name: 'social_reach' })
  socialReach: number

  @ApiProperty({ name: 'karma_minus' })
  @Column({ name: 'karma_minus' })
  karmaMinus: number

  @ApiProperty({ name: 'karma_plus' })
  @Column({ name: 'karma_plus' })
  karmaPlus: number

  @OneToOne(() => Deputy, (deputy) => deputy.rating)
  deputy: Deputy
}
