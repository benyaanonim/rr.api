import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TagUpdateInput {
  @Field()
  id: number;

  @Field()
  name: string;
}
