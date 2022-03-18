import { Query, Resolver } from '@nestjs/graphql';
import { User } from './user.schema';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {

    constructor(private readonly userService: UserService) { }

    @Query(() => [User])
    async users() {
        return this.userService.users();
    }
}
