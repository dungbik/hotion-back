import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FileController } from './file.controller';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'FILE_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '0.0.0.0',
          port: 5001,
        },
      },
    ]),
  ],
  controllers: [FileController],
})
export class FileModule {}
