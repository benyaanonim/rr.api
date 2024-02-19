import { Field, InputType } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from '../../../common/types/file.type';

@InputType()
export class CreateNewsInput {
  @Field()
  title: string;

  @Field()
  text: string;

  @Field(() => [Number])
  categories: number[];

  @Field(() => [Number])
  tags: number[];

  @Field(() => GraphQLUpload)
  image: Promise<FileUpload>;
}
