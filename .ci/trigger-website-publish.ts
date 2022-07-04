#!/usr/bin/env tsm

import Git from 'simple-git';
import semver from 'semver';
import inquirer from 'inquirer';

const git = Git();

(async () => {
  const { all: tags } = await git.tags();
  const docsTags = tags.filter((tag) => tag.startsWith('docs/v'));
  const versions = docsTags.map((tag) => semver.parse(tag.substring('docs/v'.length)));
  versions.sort((a, b) => semver.compare(a, b));
  const lastVersion = versions[versions.length - 1];
  let { major, minor, patch } = lastVersion;
  const { version: nextVersionText } = await inquirer.prompt([
    {
      type: 'list',
      name: 'version',
      message: `Next site versin?`,
      choices: [
        `patch (${major}.${minor}.${patch + 1})`,
        `minor (${major}.${minor + 1}.${0})`,
        `major (${major + 1}.${0}.${0})`,
      ],
    },
  ]);
  if (nextVersionText.startsWith('major (')) {
    major++;
  } else if (nextVersionText.startsWith('minor (')) {
    minor++;
  } else if (nextVersionText.startsWith('patch (')) {
    patch++;
  }

  const tagName = `docs/v${major}.${minor}.${patch}`;

  await git.addTag(tagName);
  await git.push('origin', tagName);

  console.log(`Created and pushed tag ${tagName} to remote!`);
})();
