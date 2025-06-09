import { resolve as resolvePath } from 'path';
import { fileURLToPath } from 'url';

import { fetchFromNpm, formatMarkdown } from '@semcore/continuous-delivery';
import fs from 'fs-extra';
import { toMarkdown } from 'marked-ast-markdown';

import { patchReleaseChangelog } from './patchers/patchReleaseChangelog';
import { serializeReleaseChangelog } from './serializers/serializeReleaseChangelog';

const filename = fileURLToPath(import.meta.url);
const releasePackageDir = resolvePath(filename, '../../../../semcore/ui/');

export const updateReleaseChangelog = async () => {
  const releasePackageFilePath = resolvePath(releasePackageDir, 'package.json');
  let releasePackageFile = await fs.readJson(releasePackageFilePath);
  const packagePublishedData = await fetchFromNpm(['@semcore/ui']);
  const currentVersion = packagePublishedData['@semcore/ui'].version;
  const currentDependencies = packagePublishedData['@semcore/ui'].dependencies;
  const changelogPatch = await patchReleaseChangelog(
    currentVersion,
    currentDependencies,
    Object.keys(releasePackageFile.dependencies),
  );
  const { changelogs: patchedReleaseChangelog, version: newVersion } = changelogPatch;
  const changelogMarkdownAst = serializeReleaseChangelog(patchedReleaseChangelog);
  const changelogText = formatMarkdown(toMarkdown(changelogMarkdownAst));
  const changelogFilePath = resolvePath(releasePackageDir, 'CHANGELOG.md');
  await fs.writeFile(changelogFilePath, changelogText);
  releasePackageFile = await fs.readJson(releasePackageFilePath);
  releasePackageFile.version = newVersion;
  await fs.writeJson(releasePackageFilePath, releasePackageFile, { spaces: 2 });
};
