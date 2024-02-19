import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Category } from '../../category/domain/category.entity';
import { Tag } from '../../tag/domain/tag.entity';

@Entity()
@ObjectType()
export class News {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  text: string;

  @Field()
  @Column({ default: 0 })
  viewCount: number;

  @Field()
  @Column()
  image: string;

  @Field()
  @Column({ type: 'timestamp' })
  publicationDate: Date;

  @Field(() => [Tag], { nullable: true })
  @ManyToMany(() => Tag, (tag) => tag.news)
  @JoinTable()
  tags: Tag[];

  @Field(() => [Category], { nullable: true })
  @ManyToMany(() => Category, (category) => category.news)
  @JoinTable()
  categories: Category[];
}
