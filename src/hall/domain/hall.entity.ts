import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Place } from './place.entity'

@Entity()
export class Hall {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ name: 'number_of_places' })
  numberOfPlaces: number

  @OneToMany(() => Place, (places) => places.hall, { nullable: true, cascade: true, onDelete: 'CASCADE' })
  places: Place[]
}
