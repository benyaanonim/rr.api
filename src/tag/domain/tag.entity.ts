import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm'
import { News } from '../../news/domain/news.entity'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class Tag {
  @ApiProperty({ description: 'The unique identifier of the tag' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ description: 'The name of the tag' })
  @Column()
  name: string

  @ApiProperty({ description: 'Link to resource' })
  @Column()
  link: string

  @ApiProperty({
    description: 'The news associated with this tag',
    isArray: true,
  })
  @ManyToMany(() => News, (news) => news.tags)
  news: News[]
}
