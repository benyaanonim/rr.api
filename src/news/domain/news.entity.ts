import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToOne,
  OneToMany,
} from 'typeorm'
import { Category } from '../../category/domain/category.entity'
import { Tag } from '../../tag/domain/tag.entity'
import { ApiProperty } from '@nestjs/swagger'
import { Source } from './source.entity'

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  text: string

  @Column({ default: 0 })
  viewCount: number

  @Column({ nullable: true })
  image: string | null

  @Column({ type: 'timestamp' })
  publicationDate: Date

  @ManyToMany(() => Tag, (tag) => tag.news)
  @JoinTable()
  tags: Tag[]

  @ManyToOne(() => Category, (category) => category.news)
  category: Category

  @OneToMany(() => Source, (sources) => sources.news)
  sources: Source[] | null
}
