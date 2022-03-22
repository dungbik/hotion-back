import { InputType, Field, ObjectType, ID } from '@nestjs/graphql';

@InputType()
export class CreateWorkSpaceInput {
  @Field(() => String)
  title: string;

  @Field(() => Boolean)
  isTeam: boolean;
}

@ObjectType()
export class UserOutput {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;
}

@ObjectType()
export class WorkSpaceOutput {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  isTeam: boolean;

  @Field(() => [UserOutput])
  members: UserOutput[];
}
