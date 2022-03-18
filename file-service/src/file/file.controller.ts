import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class FileController {
  @MessagePattern('getFile')
  async getFile() {
    return 'hi';
  }
}
