import { Args, Query, Resolver } from '@nestjs/graphql';
import { DocumentationService } from './documentation.service';
import { Interface } from './documentation.interface';
import { Type } from './documentation.type';

@Resolver((of) => Interface)
export class DocumentationResolver {
  constructor(private readonly documentationService: DocumentationService) {}

  @Query((returns) => Interface)
  async interface(@Args('name') name: string) {
    return this.documentationService.findInterfaceByName(name);
  }

  @Query((returns) => Type)
  async type(@Args('name') name: string) {
    return this.documentationService.findTypeByName(name);
  }

  @Query((returns) => [Interface])
  async interfaces() {
    return this.documentationService.getInterfaces();
  }

  @Query((returns) => [Type])
  async types() {
    return this.documentationService.getTypes();
  }
}
