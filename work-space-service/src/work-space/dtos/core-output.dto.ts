import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CoreOutput<T> {
  @Field(() => String, { nullable: true })
  error?: string;

  @Field(() => Boolean)
  ok: boolean;
}
