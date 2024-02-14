import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

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
  @Column()
  viewCount: number;

  @Field()
  @Column()
  image: string;

  @Field()
  @Column({ type: 'timestamp' })
  publicationDate: Date;

  @Field(() => Tag)
  @OneToMany(() => Tag, (tags) => tags.id)
  tags: Tag[];
}

@Entity()
@ObjectType()
export class Tag {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;
}
