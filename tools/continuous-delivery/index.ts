import fs from 'node:fs';
import * as process from 'process';

import dotenv from 'dotenv';

import { getUnlockedPrerelease } from './src/getUnlockedPrereelase';
import { publishReleaseNotes } from './src/publishReleaseNotes';
import { sendMessageAboutRelease } from './src/sendMessageAboutRelease';
import type { SeparatedPackage } from './src/types/common.types';
import { updateVersions } from './src/updateVersions';
import { formatMarkdown, log } from './src/utils';
import type { ChangelogChangeLabel, ChangelogItem } from './src/utils/changelog';
import { Changelog } from './src/utils/changelog';
import { getChangedFiles } from './src/utils/getChangedFiles';
import { gitUtils } from './src/utils/gitUtils';
import { NpmUtils } from './src/utils/npmUtils';
import { Package } from './src/utils/packages';
import { validateSlackIntegrationEnv } from './src/utils/slackIntegration';

dotenv.config();

export const initPrerelease = async () => {
  const prevReleaseTag = await gitUtils.getPrevReleaseTag();

  const packages = new Package();
  await packages.collectPackages();

  const changelog = new Changelog('v', prevReleaseTag, packages.list);
  await changelog.collectFromHistory();

  await packages.updateVersions(changelog.data);

  await gitUtils.initNewPrerelease(changelog.data.version, packages.list);
};

export const initPackagePrerelease = async (pack: SeparatedPackage) => {
  const COMPONENT_NAME = `@semcore/${pack}`;
  const prevReleaseTag = await gitUtils.getPrevPackageTag(pack);

  const packages = new Package();
  await packages.collectOnePackage(pack);

  const changelog = new Changelog(pack, prevReleaseTag, packages.list);
  await changelog.collectFromHistory();

  const components = changelog.data.components;
  const packageChangeLog = components[COMPONENT_NAME];

  if (!packageChangeLog) {
    console.log(`No changes in ${pack} package.`);
    process.exit();
  }

  await packages.updatePackageVersion(COMPONENT_NAME, packageChangeLog.incrementType, packageChangeLog.changelog);

  await gitUtils.initNewPrerelease(changelog.data.version, packages.list);
};

export const uploadStatic = async () => {
  const updatedPackages = await gitUtils.getUpdatedPackages();
  const prerelease = await gitUtils.getPrerelease();

  if (prerelease === null) {
    log('No prerelease info in current tag. Skip.');
    process.exit();
  }

  log('Update versions to prerelease...');
  await updateVersions(
    updatedPackages.map((pack) => {
      return {
        name: pack,
        prerelease,
      };
    }),
  );

  const pnpmFilter = updatedPackages.map((pack) => `--filter ${pack}`).join(' ');

  await NpmUtils.uploadStatic(pnpmFilter);
};

export const publishPrerelease = async () => {
  const updatedPackages = await gitUtils.getUpdatedPackages();
  const prerelease = await gitUtils.getPrerelease();

  if (prerelease === null) {
    log('No prerelease info in current tag. Skip.');
    process.exit();
  }

  log('Update versions to prerelease...');
  log(updatedPackages.join('\n'));
  await updateVersions(
    updatedPackages.map((pack) => {
      return {
        name: pack,
        prerelease,
      };
    }),
  );

  log('Updated versions to prerelease.');

  await NpmUtils.publish(updatedPackages, true);
};

export const publishRelease = async () => {
  const updatedPackages = await gitUtils.getUpdatedPackages();

  await NpmUtils.publish(updatedPackages, false);
};

export const getChangedPackages = async (base: string): Promise<string[]> => {
  const changedPackages = await getChangedFiles(base);

  return Array.from(changedPackages).map((pack) => {
    const [scope, name] = pack.split('/');

    return name;
  });
};

const sendReleaseChangelog = async (endpoints: string[]) => {
  const versionTag = await gitUtils.getCurrentTag();

  if (versionTag && endpoints) {
    const releaseChangelog = await Changelog.getRelease(versionTag);

    validateSlackIntegrationEnv(endpoints);

    await sendMessageAboutRelease(versionTag, releaseChangelog, endpoints);
  }
};

export const publishTool = async (toolArg: string) => {
  const tool = toolArg.trim();
  const availableTools = NpmUtils.getAvailableTools();

  if (!availableTools) {
    log('Unable to query list of available tools...');

    process.exit(1);
  }

  if (!availableTools.has(tool)) {
    log(`Unable to find ${tool} within available tools...`);
    log(`Available tools: \n${Array.from(availableTools.keys()).join('\n')}.`);

    process.exit(1);
  }

  const toolRootPath = availableTools.get(tool)!;
  const prevReleaseTag = await gitUtils.getPrevReleaseToolsTag(tool);
  const prevReleaseVersion = prevReleaseTag.replace(`tools/${tool}_`, '') as `${number}.${number}.${number}`;

  const packages = new Package();
  await packages.collectToolPackageBy(toolRootPath);

  const changelog = new Changelog(`tools/${tool}_`, prevReleaseVersion, packages.list);
  await changelog.collectFromHistory();

  await packages.updateVersions(changelog.data);
  await gitUtils.initNewToolsRelease(changelog.data.version, packages.list);

  NpmUtils.build([tool]);
  NpmUtils.publish([tool]);
};

export {
  formatMarkdown,
  publishReleaseNotes,
  getUnlockedPrerelease,
  sendReleaseChangelog,
  Package,
};

export type {
  ChangelogChangeLabel,
  ChangelogItem,
};
