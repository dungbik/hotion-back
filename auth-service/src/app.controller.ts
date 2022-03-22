import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('create_token')
  async createToken(userId: string): Promise<string> {
    return await this.appService.createToken(userId);
  }

  @MessagePattern('decode_token')
  async decodeToken(token: string): Promise<number> {
    return await this.appService.decodeToken(token);
  }
}
