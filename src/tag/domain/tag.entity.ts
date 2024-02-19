import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { News } from '../../news/domain/news.entity';

@Entity()
@ObjectType()
export class Tag {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [News], { nullable: true })
  @ManyToMany(() => News, (news) => news.tags)
  news: News[];
}
