import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Deputy } from './deputy.entity'

@Entity()
export class DeputyTag {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  descriptions: string

  @ManyToMany(() => Deputy, (deputy) => deputy.deputyTag)
  deputy: Deputy[] | null
}
