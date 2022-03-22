import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('get_user')
  async getUser(userId: number) {
    return this.userService.findOneById(userId);
  }

  @MessagePattern('get_users')
  async getUsers(userIds: number[]) {
    return this.userService.findByIds(userIds);
  }
}
