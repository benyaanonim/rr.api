import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { News } from './news.entity'

@Entity()
export class Source {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  value: string

  @ManyToOne(() => News, (news) => news.sources, { cascade: true })
  news: News
}
