import { Module } from '@nestjs/common';
import { WorkSpaceResolver } from './work-space.resolver';
import { WorkSpaceService } from './work-space.service';

@Module({
  providers: [WorkSpaceResolver, WorkSpaceService]
})
export class WorkSpaceModule {}
