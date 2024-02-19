import { Field, InputType } from '@nestjs/graphql';
import { FileUpload } from '../../../common/types/file.type';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

@InputType()
export class UpdateNewsInput {
  @Field()
  id: number;

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
