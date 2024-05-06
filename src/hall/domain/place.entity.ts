import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Hall } from './hall.entity'
import { Deputy } from '../../deputy/domain/deputy.entity'

@Entity()
export class Place {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'place_number' })
  placeNumber: number

  @ManyToOne(() => Hall, (hall) => hall.places)
  hall: Hall

  @OneToOne(() => Deputy, (deputy) => deputy.place, { nullable: true })
  @JoinColumn()
  deputy: Deputy
}
