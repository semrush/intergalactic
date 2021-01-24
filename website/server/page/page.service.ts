import { Injectable, OnModuleInit } from '@nestjs/common';
import * as chokidar from 'chokidar';
import { Documentalist, MarkdownPlugin } from 'documentalist';
import { Heading, Navigation, Page } from './page.interface';
import { hashCode, normalizeDocumentalistContents } from '../utils';
const clc = require('cli-color');

const warn = clc.yellow;
const DOCS_DIR = './docs/**/**.md';
const LIST_HASH_TITLE = [];

const processDocumentalist = new Documentalist({}, [
  {
    pattern: /\.mdx?$/,
    plugin: new MarkdownPlugin(),
  },
]);

function flatList(list: any[], property: string): any[] {
  if (!Array.isArray(list)) return list;
  const flatList = [];

  list.forEach((element) => {
    getElement(element);
  });

  function getElement(element) {
    flatList.push(element);
    if (element[property] && element[property].length) {
      element[property].forEach(getElement);
    }
  }
  return flatList;
}

function checkValidUrl(pages, validUrls) {
  pages.forEach((page) => {
    page.contents.forEach((content) => {
      const urls = content.value.match(/href="[^\s]+"/g);
      if (urls) {
        urls.forEach((href) => {
          if (href.includes('http') || href.includes('mailto') || href.length < 9) {
            return false;
          }
          const url = href
            .replace(/href="/, '')
            .slice(0, -1)
            .replace(/^\/|\/$/g, '');
          const hash = url.split('#')[1];

          if (!validUrls.includes(url)) {
            // check valid hash
            if (hash && LIST_HASH_TITLE.find((name) => name === hash)) {
              return false;
            }

            console.log(warn(`I not valid url "${url}" in "${page.route}"`));
          }
        });
      }
    });
  });
}

@Injectable()
export class PageService implements OnModuleInit {
  private pages: Page[] = [];
  private heading: {
    [reference: string]: Heading[];
  } = {};
  private navigation: Navigation[] = [];

  async onModuleInit() {
    const watcher = chokidar.watch(DOCS_DIR, { ignoreInitial: true });
    watcher.on('add', this.processingMD.bind(this));
    watcher.on('change', this.processingMD.bind(this));
    watcher.on('unlink', this.processingMD.bind(this));
    await this.processingMD();

    const allRoutes = flatList(this.getNavigation(), 'children').map((item) => item.route);
    checkValidUrl(this.getPages(), allRoutes);
  }

  async processingMD() {
    const { nav, pages } = await processDocumentalist.documentGlobs(DOCS_DIR);

    this.pages = Object.values(pages).map((page) => ({
      ...page,
      contents: normalizeDocumentalistContents(page.contents),
    }));

    this.heading = nav.reduce(function reduceHeading(heading, n) {
      if (!n.reference) {
        const reference = n.route.split('.')[0];
        heading[reference] = heading[reference] || [];
        n.route = hashCode(n.title);
        heading[reference].push(n);
        LIST_HASH_TITLE.push(n.route);
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
