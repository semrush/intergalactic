import fs from 'fs/promises';
import { componentChangelogParser } from './parsers/componentChangelogParser';
import equal from 'fast-deep-equal';
import { serializeComponentChangelog } from './serializers/serializeComponentChangelog';
import { toMarkdown } from 'marked-ast-markdown';
import { Changelog } from './types';
import semver from 'semver';

export const mergeChangelogs = async (
  aPath: string,
  bPath: string,
  gitOursRef: string,
  gitBaseRef: string,
) => {
  const [aText, bText] = await Promise.all([
    fs.readFile(aPath, 'utf-8'),
    fs.readFile(bPath, 'utf-8'),
  ]);
  const a = componentChangelogParser('x', aText, aPath);
  const b = componentChangelogParser('x', bText, bPath);

  const output: (string | Changelog)[] = [];
  let aIndex = a.length - 1;
  let bIndex = b.length - 1;

  while (a[aIndex] || b[bIndex]) {
    const aChangelog = a[aIndex];
    const bChangelog = b[bIndex];

    if (!aChangelog) {
      output.push(bChangelog);
      bIndex--;
    } else if (!bChangelog) {
      output.push(aChangelog);
      aIndex--;
    } else if (aChangelog.version === bChangelog.version) {
      if (equal(aChangelog.changes, bChangelog.changes)) {
        output.push(aChangelog);
      } else {
        output.push(`>>>>>>> ${gitBaseRef}`);
        output.push(bChangelog);
        output.push('=======');
        output.push(aChangelog);
        output.push(`<<<<<<< ${gitOursRef}`);
      }
      aIndex--;
      bIndex--;
    } else if (semver.compare(aChangelog.version, bChangelog.version) === -1) {
      output.push(aChangelog);
      aIndex--;
    } else if (semver.compare(aChangelog.version, bChangelog.version) === 1) {
      output.push(bChangelog);
      bIndex--;
    } else {
      /* eslint-disable no-console */
      console.log('changelog a:');
      console.log(aChangelog);
      console.log('changelog b:');
      console.log(bChangelog);
      /* eslint-enable no-console */
      throw new Error(
        `Unable to handle merging of changelogs above from ${gitOursRef} merged into ${gitBaseRef}`,
      );
    }
  }

  output.reverse();

  return toMarkdown(serializeComponentChangelog(output));
};
