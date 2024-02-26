import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { News } from '../../news/domain/news.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Category {
  @ApiProperty({ description: 'The unique identifier of the category' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The name of the category' })
  @Column()
  name: string;

  @ApiProperty({
    description: 'The news associated with this category',
    isArray: true,
    items: {
      description: 'news array',
    },
  })
  @ManyToMany(() => News, (news) => news.categories)
  news: News[];
}
