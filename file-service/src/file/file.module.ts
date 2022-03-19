import { Module } from '@nestjs/common';
import { FileResolver } from './file.resolver';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  providers: [FileResolver, FileService],
  controllers: [FileController],
})
export class FileModule {}
