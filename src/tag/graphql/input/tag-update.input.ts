import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateTagInput {
  @Field()
  id: number;

  @Field()
  name: string;
}
