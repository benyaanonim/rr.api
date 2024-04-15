import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Deputy } from './deputy.entity'

@Entity()
export class OtherInfo {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column('text', { array: true })
  description: string[]

  @ManyToOne(() => Deputy)
  deputy: Deputy
}
