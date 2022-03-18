import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Page {
  @Field(() => ID)
  id: Number;

  @Field()
  title: string;
}
