import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class File {
  @Field(() => ID)
  id: Number;

  @Field()
  originalName: string;
}
