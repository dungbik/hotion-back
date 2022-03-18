import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('files')
export class FileController {
  constructor(@Inject('FILE_SERVICE') private client: ClientProxy) {}

  @Get()
  async getFile(): Promise<string> {
    const userResponse: string = await firstValueFrom(
      this.client.send('getFile', {}),
    );
    return userResponse;
  }
}
