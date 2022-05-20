import * as crypto from 'crypto';
import path from 'path';
import fs from 'fs';
import { Tag } from '../page/page.interface';

export function hashCode(s) {
  return 'a' + crypto.createHash('md5').update(s).digest('hex').slice(0, 5);
}

const re = new RegExp('href="/(.*?)"', 'gmi');

export function normalizeDocumentalistContents(contents, ROOT_PATH): Tag[] {
  return contents.map((tag) => {
    if (typeof tag === 'object' && tag.value) {
      const _splitValue = tag.value.split('{');
      tag.value = _splitValue[0].trim();

      if (_splitValue[1]) {
        tag.options = '{' + _splitValue[1];
      }

      if (tag.tag === 'heading') {
        tag.route = hashCode(tag.value);
      }
    }
    if (typeof tag === 'string') {
      tag = { tag: 'text', value: tag.replace(re, `href="${ROOT_PATH}$1"`) };
    }
    return tag;
  });
}

export function checkValidUrl(pages, validUrls, hashesTitles) {
  pages.forEach((page) => {
    page.contents.forEach((content) => {
      const matches = content.value.match(/href="[^\s]+"/g);
      if (matches) {
        const urls = matches.map((match) => {
          const mathUrl = match.replace(/^href="/, '').replace(/"$/g, '');
          const [pathname, hash] = mathUrl.split('#');
          return {
            origin: mathUrl,
            hash,
            pathname: pathname.replace(/\/$/, ''),
            extname: path.extname(pathname),
          };
        });
        urls
          .filter(
            ({ pathname }) =>
              !(/https?:/.test(pathname) || pathname.startsWith('mailto:') || pathname !== '/'),
          )
          .forEach(({ origin, pathname, hash, extname }) => {
            if (extname) {
              try {
                const info = fs.statSync(path.resolve(path.dirname(page.sourcePath), pathname));
                if (!info.isFile()) {
                  throw new Error('Passed path is not a file');
                }
              } catch (e) {
                console.warn(`Invalid url found "${origin}" in "${page.route}"`);
              }
              return;
            }
            if (!validUrls.includes(pathname)) {
              console.warn(`Invalid url found "${origin}" in "${page.route}"`);
              return;
            }
            if (hash && !hashesTitles.includes(hash)) {
              console.warn(`Invalid anchor found "${origin}" in "${page.route}"`);
              return;
            }
          });
      }
    });
  });
}

export function flatList(list: any[], property: string): any[] {
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
