import { resolve as resolvePath } from 'path';

import fs from 'fs-extra';
import { toMarkdown } from 'marked-ast-markdown';

import { formatMarkdown } from './utils';
import { Changelog } from './utils/changelog';
import { Package } from './utils/packages';

const packages = new Package();

export const formatChangelogs = async () => {
  await packages.collectPackages();

  await Promise.all(
    Array.from(packages.packagesMap.entries()).map(async ([name, { path }]) => {
      const changelogPath = resolvePath(path, 'CHANGELOG.md');
      const changelogString = await fs.readFile(changelogPath, 'utf-8');

      if (name !== '@semcore/ui') {
        const changelogs = Changelog.componentParser(name, changelogString, changelogPath);

        await fs.writeFile(
          changelogPath,
          formatMarkdown(toMarkdown(Changelog.serializeComponent(changelogs))),
        );
      }
    }),
  );
};
