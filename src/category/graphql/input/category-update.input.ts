import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CategoryUpdateInput {
  @Field()
  id: number;
  @Field()
  name: string;
}
