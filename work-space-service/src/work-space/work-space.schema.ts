import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class WorkSpace {
  @Field(() => ID)
  id: Number;

  @Field()
  title: string;
}
