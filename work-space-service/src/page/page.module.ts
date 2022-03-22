import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PageService } from './page.service';
import { PageResolver } from './page.resolver';
import { Page } from './entities/page.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Page]),
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: { host: 'user', port: 5002 },
      },
    ]),
  ],
  providers: [PageService, PageResolver],
})
export class PageModule {}
