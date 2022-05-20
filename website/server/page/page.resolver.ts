import { Args, Query, Resolver } from '@nestjs/graphql';
import { PageService } from './page.service';
import { Heading, Navigation, Page } from './page.interface';

@Resolver((of) => Page)
export class PageResolver {
  constructor(private readonly pageService: PageService) {}

  @Query((returns) => Page)
  async page(@Args('slug') slug: string) {
    return this.pageService.findPageBySlug(slug);
  }

  @Query((returns) => [Page])
  async pages() {
    return this.pageService.getPages();
  }

  @Query((returns) => [Navigation])
  async navigation() {
    return this.pageService.getNavigation();
  }

  @Query((returns) => [Heading])
  async headings(@Args('slug') slug: string) {
    return this.pageService.findHeadingsBySlug(slug);
  }
}
