import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Deputy } from './deputy.entity'

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  attendance: number

  @Column()
  education: number

  @Column({ name: 'feed_frequency' })
  feedFrequency: number

  @Column({ name: 'corruption_risks' })
  corruptionRisks: number

  @Column({ name: 'experience_in_politics' })
  experienceInPolitics: number

  @Column({ name: 'social_reach' })
  socialReach: number

  @Column({ name: 'karma_minus' })
  karmaMinus: number

  @Column({ name: 'karma_plus' })
  karmaPlus: number

  @OneToOne(() => Deputy, (deputy) => deputy.rating)
  deputy: Deputy
}
