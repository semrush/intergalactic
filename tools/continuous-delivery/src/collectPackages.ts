import { resolve as resolvePath } from 'path';
import fs from 'fs-extra';
import { parse as parseMarkdown } from 'marked-ast';
import dayjs from 'dayjs';
import semver from 'semver';
import { Token } from 'marked-ast-markdown';

export type Version = {
  version: string;
  date: 'unreleased' | string;
  notes: { [noteType: string]: Token[] };
  isPrivate: boolean;
};

export type Package = {
  name: string;
  path: string;
  isPrivate: boolean;
  versions: Version[];
  currentVersion: string;
  lastPublishedVersion: string | null;
  dependencies: { [dependencyName: string]: string };
};

const isValidSemver = (version: string) => {
  if (version === '*') return true;

  let cleaned = String(version).trim();
  if (cleaned.startsWith('~')) {
    cleaned = cleaned.substring(1);
  } else if (cleaned.startsWith('^')) {
    cleaned = cleaned.substring(1);
  }

  return semver.valid(semver.coerce(cleaned.trim()));
};

export const collectPackages = async (inNpmVersions: { [packageName: string]: string }) => {
  const packagePaths = [
    ...(await fs.readdir(resolvePath('./semcore'))).map((packageName) =>
      resolvePath('./semcore', packageName),
    ),
    ...(await fs.readdir(resolvePath('./tools'))).map((packageName) =>
      resolvePath('./tools', packageName),
    ),
  ];

  const packages: Package[] = [];

  for (const packagePath of packagePaths) {
    const packageFilePath = resolvePath(packagePath, 'package.json');
    const changelogPath = resolvePath(packagePath, 'CHANGELOG.md');

    if (!(await fs.pathExists(packageFilePath)) || !(await fs.pathExists(changelogPath))) continue;

    const packageFile: {
      name: string;
      version: string;
      private?: boolean;
      dependencies: { [dependencyName: string]: string };
    } = await fs.readJson(resolvePath(packagePath, 'package.json'));
    const changelog = await fs.readFile(resolvePath(packagePath, 'CHANGELOG.md'), 'utf-8');
    const changelogAst = parseMarkdown(changelog);
    const isChangelogValid =
      changelogAst[0].type === 'heading' &&
      changelogAst[0].level === 1 &&
      changelogAst[0].text.join('') === 'Changelog';

    if (!isChangelogValid) {
      throw new Error(`Invalid changelog file ${changelogPath}`);
    }

    const handledVersions = new Map<string, true>();
    const versions: Version[] = [];

    let traversingVersion: string | null = null;
    let traversingNoteType: string | null = null;

    for (const token of changelogAst) {
      if (token.type === 'heading' && token.level === 2) {
        const [versionContainer, date] = token.text.join('').split(' - ');
        if (!versionContainer || !date) {
          throw new Error(
            `Unable to process "${token.text.join('')}" row of changelog ${changelogPath}`,
          );
        }

        const version = versionContainer.substring(1, versionContainer.length - 1);
        if (!isValidSemver(version)) {
          throw new Error(
            `Invalid version in "${token.text.join('')}" row of changelog ${changelogPath}`,
          );
        }
        traversingVersion = version;
        traversingNoteType = null;

        let isPrivate = packageFile.private || false;
        if (!dayjs(date).isValid()) {
          if (date === 'unreleased') {
            isPrivate = true;
          } else {
            throw new Error(
              `Invalid date in "${token.text.join('')}" row of changelog ${changelogPath}`,
            );
          }
        }

        if (handledVersions.has(version)) {
          throw new Error(`Duplicated version "${version}" in changelog ${changelogPath}`);
        }

        versions.push({
          version,
          date,
          notes: {},
          isPrivate,
        });
        handledVersions.set(version, true);
      } else if (token.type === 'heading' && token.level === 3) {
        if (traversingVersion !== null) {
          traversingNoteType = token.text.join('');
        } else {
          throw new Error(
            `Unexpected heading of level 3 "${token.text.join('')}" in changelog ${changelogPath}`,
          );
        }
      } else if (traversingVersion && traversingNoteType) {
        const notesContainer = versions[versions.length - 1].notes;
        notesContainer[traversingNoteType] = notesContainer[traversingNoteType] || [];
        notesContainer[traversingNoteType].push(token);
      }
    }

    const dependencies: Package['dependencies'] = {};
    for (const dependenciesType of ['dependencies', 'devDependencies', 'peerDependencies']) {
      for (const dependency in packageFile[dependenciesType]) {
        if (['@types/react'].includes(dependency)) continue;

        const version = packageFile[dependenciesType][dependency];
        if (!isValidSemver(version)) {
          throw new Error(
            `Invalid dependency "${dependency}" version "${version}" in ${packageFilePath}`,
          );
        }
        dependencies[dependency] = version;
      }
    }

    packages.push({
      name: packageFile.name,
      path: packagePath,
      isPrivate: packageFile.private || false,
      versions,
      currentVersion: packageFile.version,
      lastPublishedVersion: null,
      dependencies,
    });
  }

  const scopes = new Set<string>();

  for (const packageFile of packages) {
    const scope = packageFile.name.startsWith('@') ? packageFile.name.split('/')[0] : null;
    scopes.add(scope);
  }

  if (scopes.size > 1 && [...scopes][0] !== '@semcore') {
    const stringifiedScopes = JSON.stringify([...scopes]);

    throw new Error(
      `Only @semcore packages scope continuous delivery is available for now but got ${stringifiedScopes}. Update \`fetchVersionsFromNpm\` search and this lock`,
    );
  }

  for (const packageFile of packages) {
    const version = inNpmVersions[packageFile.name];
    packageFile.lastPublishedVersion = isValidSemver(version) ? version : null;
  }

  return packages;
};
