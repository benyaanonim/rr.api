import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Category } from '../../category/domain/category.entity';
import { Tag } from '../../tag/domain/tag.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The unique identifier of the news' })
  id: number;

  @Column()
  @ApiProperty({
    example: 'Breaking News',
    description: 'The title of the news',
  })
  title: string;

  @Column()
  @ApiProperty({
    example: 'This is the news text.',
    description: 'The text content of the news',
  })
  text: string;

  @Column({ default: 0 })
  @ApiProperty({ example: 0, description: 'The view count of the news' })
  viewCount: number;

  @Column('text', { array: true, default: [] })
  @ApiProperty({
    example: ['source1', 'source2'],
    description: 'The sources of the news',
  })
  sources: string[];

  @Column()
  @ApiProperty({
    example: 'image.jpg',
    description: 'The image associated with the news',
  })
  image: string;

  @Column({ type: 'timestamp' })
  @ApiProperty({
    example: '2021-12-31T23:59:59Z',
    description: 'The publication date of the news',
  })
  publicationDate: Date;

  @ManyToMany(() => Tag, (tag) => tag.news)
  @JoinTable()
  @ApiProperty({
    type: [Tag],
    description: 'The tags associated with the news',
  })
  tags: Tag[];

  @ManyToMany(() => Category, (category) => category.news)
  @JoinTable()
  @ApiProperty({
    type: [Category],
    description: 'The categories associated with the news',
  })
  categories: Category[];
}
