import { Module } from '@nestjs/common';
import { PageResolver } from './page.resolver';
import { PageService } from './page.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [PageService, PageResolver],
})
export class PageModule {}
