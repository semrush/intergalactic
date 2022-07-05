#!/usr/bin/env tsm

import Git from 'simple-git';
import semver from 'semver';
import { resolve as resolvePath } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import picocolors from 'picocolors';

const git = Git();

(async () => {
  const status = await git.status();
  const branch = await git.branch();

  if (branch.detached) {
    console.log(
      '\n',
      picocolors.bgRed(picocolors.black(` website publish failed `)),
      '\n',
      'Branch must not be detached. Checkout to master first.',
      '\n',
    );
    process.exit(1);
  }
  if (branch.current !== 'master') {
    console.log(
      '\n',
      picocolors.bgRed(picocolors.black(` website publish failed `)),
      '\n',
      'Website publish by this util is allowed only from master branch. Checkout to master first.',
      '\n',
    );
    process.exit(1);
  }
  if (!status.isClean()) {
    console.log(
      '\n',
      picocolors.bgRed(picocolors.black(` website publish failed `)),
      '\n',
      'Git working tree must be clean before publishing site. Commit all your changes, push them and run publish command again.',
      '\n',
    );
    process.exit(1);
  }

  console.log(
    '\n' + picocolors.bgBlue(picocolors.black(` website publish pending rebase `)),
    '\nRebasing on remote master. In case of conflicts you should complete rebase by yourself and restart website publishing.\n',
  );

  await git.pull('origin', 'master', { '--rebase': 'true' });

  console.log(picocolors.green(`\nrebased successfully\n`));

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
      message: `Next site version?`,
      choices: [
        `patch (${major}.${minor}.${patch + 1})`,
        `minor (${major}.${minor + 1}.${0})`,
        `major (${major + 1}.${0}.${0})`,
      ],
    },
  ]);
  if (nextVersionText.startsWith('major (')) {
    major++;
    minor = 0;
    patch = 0;
  } else if (nextVersionText.startsWith('minor (')) {
    minor++;
    patch = 0;
  } else if (nextVersionText.startsWith('patch (')) {
    patch++;
  }

  const version = `${major}.${minor}.${patch}`;
  const tagName = `docs/v${version}`;
  const commitSuffix = `[website] updated to ${version}:`;

  const answer = await inquirer.prompt({
    type: 'input',
    name: 'Summarize version changes (commit message)',
    validate: (input) => input.length >= 3,
    suffix: `\n${commitSuffix}`,
  });
  const commitMessage = (commitSuffix + ' ' + Object.values(answer)[0]) as string;

  const websitePackageFilePath = resolvePath(
    fileURLToPath(import.meta.url),
    '../../website/package.json',
  );

  const websitePackageFile = await fs.readJSON(websitePackageFilePath);
  websitePackageFile.version = version;
  await fs.writeJSON(websitePackageFilePath, websitePackageFile, { spaces: 2 });
  console.log(picocolors.green(`\nupdated package version in webiste/package.json to ${version}`));

  await git.add([websitePackageFilePath]);
  await git.commit(commitMessage, [websitePackageFilePath]);
  console.log(picocolors.green(`added commit "${commitMessage}"`));

  await git.push('origin');
  console.log(picocolors.green(`pushed commit to remote`));

  await git.addTag(tagName);
  console.log(picocolors.green(`added local git tag "${tagName}"`));
  await git.push('origin', tagName);
  console.log(picocolors.green(`pushed git tag "${tagName}" to remote`));
  console.log(
    picocolors.blue(`Checkout website cloud build was started in commits history on GitHub`),
  );
})();
