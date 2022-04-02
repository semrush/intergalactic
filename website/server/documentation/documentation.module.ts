import { Module } from '@nestjs/common';
import { DocumentationResolver } from './documentation.resolver';
import { DocumentationService } from './documentation.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [DocumentationService, DocumentationResolver],
})
export class DocumentationModule {}
