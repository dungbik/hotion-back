import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SignInInput, SignInOutput } from './dtos/sign-in.dto';
import { SignUpInput, SignUpOutput } from './dtos/sign-up.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users() {
    return this.userService.users();
  }

  @Mutation(() => SignUpOutput)
  async signUp(@Args('input') signUpInput: SignUpInput): Promise<SignUpOutput> {
    return this.userService.signUp(signUpInput);
  }

  @Mutation(() => SignInOutput)
  async signIn(@Args('input') signInInput: SignInInput): Promise<SignInOutput> {
    return this.userService.signIn(signInInput);
  }
}
