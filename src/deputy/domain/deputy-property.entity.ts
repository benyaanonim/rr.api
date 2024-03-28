import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Deputy } from './deputy.entity'

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text', { array: true, nullable: true })
  savings: string[] | null

  @Column('text', { array: true, nullable: true })
  other: string[] | null

  @Column('text', { array: true, name: 'real_estate', nullable: true })
  realEstate: string[] | null

  @Column('text', { array: true, nullable: true })
  cars: string[] | null

  @Column('text', { array: true, nullable: true })
  business: string[] | null

  @OneToOne(() => Deputy, (deputy) => deputy.property)
  deputy: Deputy | null
}
