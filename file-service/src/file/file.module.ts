import { Module } from '@nestjs/common';
import { FileResolver } from './file.resolver';
import { FileService } from './file.service';

@Module({
  providers: [FileResolver, FileService],
  controllers: [],
})
export class FileModule {}
