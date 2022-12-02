import { resolve as resolvePath } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import { patchReleaseChangelog } from './patchers/patchReleaseChangelog';
import { toMarkdown } from 'marked-ast-markdown';
import { serializeReleaseChangelog } from './serializers/serializeReleaseChangelog';
import execa from 'execa';
import { fetchFromNpm } from '@semcore/continuous-delivery';

const filename = fileURLToPath(import.meta.url);
const releasePackageDir = resolvePath(filename, '../../../../semcore/ui/');

export const updateReleaseChangelog = async () => {
  // eslint-disable-next-line no-console
  console.log(releasePackageDir);
  const releasePackageFilePath = resolvePath(releasePackageDir, 'package.json');
  let releasePackageFile = await fs.readJson(releasePackageFilePath);
  const packagePublishedData = await fetchFromNpm(['@semcore/ui']);
  const currentVersion = packagePublishedData['@semcore/ui'].version;
  const currentDependencies = packagePublishedData['@semcore/ui'].dependencies;
  const changelogPatch = await patchReleaseChangelog(currentVersion, currentDependencies);
  const { changelogs: patchedReleaseChangelog, version: newVersion } = changelogPatch;
  const changelogMarkdownAst = serializeReleaseChangelog(patchedReleaseChangelog);
  const changelogText = toMarkdown(changelogMarkdownAst);
  // eslint-disable-next-line no-console
  console.log(releasePackageDir, '1');
  const changelogFilePath = resolvePath(releasePackageDir, 'CHANGELOG.md');
  // eslint-disable-next-line no-console
  console.log(changelogFilePath, '2');
  await fs.writeFile(changelogFilePath, changelogText);
  // eslint-disable-next-line no-console
  console.log(releasePackageFilePath, '3');
  await execa('prettier', ['--write', changelogFilePath]);
  releasePackageFile = await fs.readJson(releasePackageFilePath);
  releasePackageFile.version = newVersion;
  // eslint-disable-next-line no-console
  console.log(releasePackageFilePath, '4');
  await fs.writeJson(releasePackageFilePath, releasePackageFile, { spaces: 2 });
};
