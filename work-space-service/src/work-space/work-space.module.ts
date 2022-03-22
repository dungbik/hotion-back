import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { WorkSpace } from './entities/work-space.entity';
import { WorkSpaceResolver } from './work-space.resolver';
import { WorkSpaceService } from './work-space.service';
import { WorkSpaceMember } from './entities/work-space-member.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkSpace, WorkSpaceMember]),
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: { host: 'user', port: 5002 },
      },
    ]),
  ],
  providers: [WorkSpaceResolver, WorkSpaceService],
})
export class WorkSpaceModule {}
