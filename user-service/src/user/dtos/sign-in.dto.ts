import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { CoreOutput } from './core-output.dto';

@InputType()
export class SignInInput extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class SignInOutput extends CoreOutput {
  @Field(() => String, { nullable: true })
  token?: string;
}
