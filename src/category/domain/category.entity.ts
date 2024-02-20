import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { News } from '../../news/domain/news.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => News, (news) => news.categories)
  news: News[];
}
