import { Module } from '@nestjs/common';
import { DocumentationResolver } from './documentation.resolver';
import { DocumentationService } from './documentation.service';

@Module({
  providers: [DocumentationService, DocumentationResolver],
})
export class DocumentationModule {}
