import * as crypto from 'crypto';
import { Tag } from '../page/page.interface';

export function hashCode(s) {
  return (
    'a' +
    crypto
      .createHash('md5')
      .update(s)
      .digest('hex')
      .slice(0, 5)
  );
}

export function normalizeDocumentalistContents(contents): Tag[] {
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
      tag = { tag: 'text', value: tag };
    }
    return tag;
  });
}
