import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { CoreOutput } from './core-output.dto';

@InputType()
export class SignUpInput extends PickType(User, [
  'username',
  'email',
  'password',
]) {}

@ObjectType()
export class SignUpOutput extends CoreOutput {}
