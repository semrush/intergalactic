import { access as fsAccess } from 'fs/promises';

import { fromMarkdown } from 'mdast-util-from-markdown';

import { Content as MarkdownToken, Root as MarkdownRoot } from 'mdast';
import { gfm } from 'micromark-extension-gfm';
import { gfmFromMarkdown } from 'mdast-util-gfm';
import { toHast } from 'mdast-util-to-hast';
import { toHtml } from 'hast-util-to-html';
import { createHash } from 'crypto';

const cyrillicFallback = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  е: 'e',
  ё: 'yo',
  ж: 'zh',
  з: 'z',
  и: 'i',
  й: 'i',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'kh',
  ц: 'ts',
  ч: 'ch',
  ш: 'sh',
  щ: 'shch',
  ъ: "'",
  ы: 'y',
  ь: "'",
  э: 'e',
  ю: 'yu',
  я: 'ya',
};

export const generateLegacyHeadingId = (headingText: string) =>
  'a' + createHash('md5').update(headingText).digest('hex').slice(0, 5);
export const generateHeadingId = (headingText: string) =>
  headingText
    .toLowerCase()
    .trim()
    .split('')
    .map((char) => cyrillicFallback[char] ?? char)
    .join('')
    .replace(/^\d+/g, '_')
    .replace(/\W+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_/g, '')
    .replace(/_$/g, '');

export const fsExists = async (path: string) => {
  try {
    await fsAccess(path);
    return true;
  } catch {
    return false;
  }
};

export const parseMarkdownMeta = (contents: string) => {
  const lines = contents.split('\n');
  const metaEnd = 1 + lines.slice(1).indexOf('---');
  if (lines[0] !== '---' || metaEnd === 0) {
    return {};
  }
  const metaLines = lines.slice(1, metaEnd);
  const meta: { [key: string]: string } = {};
  for (const line of metaLines) {
    const [key, value] = line.split(': ');
    meta[key] = value;
  }
  return meta;
};

export const removeMarkdownMeta = (contents: string) => {
  const lines = contents.split('\n');
  if (lines[0] !== '---') return contents;
  const metaEnd = 1 + lines.slice(1).indexOf('---');
  if (metaEnd === 0) return contents;

  return lines.slice(metaEnd + 1).join('\n');
};

export const parseMarkdown = (markdownText: string) => {
  return fromMarkdown(markdownText, {
    extensions: [gfm()],
    mdastExtensions: [gfmFromMarkdown()],
  });
};

export const markdownTokenToHtml = (token: MarkdownToken | MarkdownRoot) => {
  const hast = toHast(token, {
    allowDangerousHtml: true,
    handlers: {
      link: (h, node) => {
        const text = node.title ?? node.children[0]?.value;
        const props = { href: node.url, title: text } as {
          href: string;
          title: string;
          target?: '_blank';
          rel?: 'noopener noreferrer';
        };

        if (!node.url.startsWith('/')) {
          props.target = '_blank';
          props.rel = 'noopener noreferrer';
        }

        return h(node, 'a', props, [{ type: 'text', value: text }]);
      },
    },
  });
  const html = toHtml(hast, { allowDangerousHtml: true });

  return html;
};
