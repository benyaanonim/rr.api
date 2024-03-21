import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { News } from '../../news/domain/news.entity'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class Category {
  @ApiProperty({ description: 'The unique identifier of the category' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ description: 'The name of the category' })
  @Column()
  name: string

  @ApiProperty({ description: 'Admin name will be created' })
  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt: Date

  @ApiProperty({ description: 'Display access by default true' })
  @Column({ default: true })
  accessible: boolean

  @ApiProperty({ description: 'Admin name will be created' })
  @Column({ name: 'created_by' })
  createdBy: string

  @ApiProperty({
    description: 'The news associated with this category',
    isArray: true,
    items: {
      description: 'news array',
    },
  })
  @OneToMany(() => News, (news) => news.category)
  news: News[]
}
