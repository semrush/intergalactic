import { Injectable, OnModuleInit } from '@nestjs/common';
import * as chokidar from 'chokidar';
import { Documentalist, MarkdownPlugin } from 'documentalist';
import { Heading, Navigation, Page } from './page.interface';
import { checkValidUrl, flatList, hashCode, normalizeDocumentalistContents } from '../utils';
import { ConfigService } from '@nestjs/config';

const DOCS_DIR = './docs/**/**.md';

const processDocumentalist = new Documentalist({}, [
  {
    pattern: /\.mdx?$/,
    plugin: new MarkdownPlugin(),
  },
]);

@Injectable()
export class PageService implements OnModuleInit {
  private pages: Page[] = [];
  private heading: {
    [reference: string]: Heading[];
  } = {};
  private navigation: Navigation[] = [];
  private hashesTitles: string[] = [];
  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const ROOT_PATH = this.configService.get('ROOT_PATH', '/');

    const watcher = chokidar.watch(DOCS_DIR, { ignoreInitial: true });
    watcher.on('add', this.processingMD.bind(this));
    watcher.on('change', this.processingMD.bind(this));
    watcher.on('unlink', this.processingMD.bind(this));
    await this.processingMD(ROOT_PATH);

    const allRoutes = flatList(this.getNavigation(), 'children').map(
      (item) => `${ROOT_PATH}${item.route}`,
    );
    checkValidUrl(this.getPages(), allRoutes, this.hashesTitles);
  }

  async processingMD(ROOT_PATH) {
    const { nav, pages } = await processDocumentalist.documentGlobs(DOCS_DIR);
    const self = this;

    this.pages = Object.values(pages).map((page) => ({
      ...page,
      contents: normalizeDocumentalistContents(page.contents, ROOT_PATH),
    }));

    this.heading = nav.reduce(function reduceHeading(heading, n) {
      if (!n.reference) {
        const reference = n.route.split('.')[0];
        heading[reference] = heading[reference] || [];
        n.route = hashCode(n.title);
        heading[reference].push(n);
        self.hashesTitles.push(n.route);
      }
      if (n.children) n.children.reduce(reduceHeading, heading);
      return heading;
    }, {});

    this.navigation = nav.reduce(function reduceNavigation(navigation, n) {
      if (!n.reference) return navigation;
      if (n.children) n.children = n.children.reduce(reduceNavigation, []);
      navigation.push({
        ...n,
        metadata: pages[n.reference].metadata,
      });
      return navigation;
    }, []);
  }

  findPageBySlug(slug) {
    return this.pages.find((p) => p.route === slug);
  }

  findHeadingsBySlug(slug) {
    return this.heading[slug] || [];
  }

  getPages() {
    return this.pages;
  }

  getNavigation() {
    return this.navigation;
  }
}
