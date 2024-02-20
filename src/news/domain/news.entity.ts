import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Category } from '../../category/domain/category.entity';
import { Tag } from '../../tag/domain/tag.entity';

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @Column({ default: 0 })
  viewCount: number;

  @Column()
  image: string;

  @Column({ type: 'timestamp' })
  publicationDate: Date;

  @ManyToMany(() => Tag, (tag) => tag.news)
  @JoinTable()
  tags: Tag[];

  @ManyToMany(() => Category, (category) => category.news)
  @JoinTable()
  categories: Category[];
}
