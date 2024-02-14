import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class InputId {
  @Field()
  id: number;
}
