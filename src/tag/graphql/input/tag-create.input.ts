import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TagCreateInput {
  @Field()
  name: string;
}
