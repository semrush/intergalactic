import { Module } from '@nestjs/common';
import { PageResolver } from './page.resolver';
import { PageService } from './page.service';

@Module({
  providers: [PageService, PageResolver],
})
export class PageModule {}
