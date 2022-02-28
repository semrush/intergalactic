# super-publisher

Package is purposed to make monorepo publishing easer.

## Getting started

### Installing

`yarn add -D super-publisher`

### Usage

`yarn super-publisher`

### Конфигурация

`.publisher.ts`

```ts
import { chosePackagesTask } from './node_modules/super-publisher/tasks/chosePackages';
import { lintTask } from './node_modules/super-publisher/tasks/prettier';
import { testTask } from './node_modules/super-publisher/tasks/jest';
import { showGitDiffTask } from './node_modules/super-publisher/tasks/showGitDiff';
import { choseNextVersionTask } from './node_modules/super-publisher/tasks/choseNextVersion';
import { npmVersionTask } from './node_modules/super-publisher/tasks/npmVersion';
import { gitCommitTask } from './node_modules/super-publisher/tasks/gitCommit';
import { gitPushTask } from './node_modules/super-publisher/tasks/gitPush';
import { npmPublishTask } from './node_modules/super-publisher/tasks/npmPublish';

export const publisherConfigFactory = async (args) => {
  const cwd = await chosePackages(args.root);
  await lint(cwd);
  await test({ rootDir: cwd });
  await showGitDiff();
  const nextNameNpmVersion = await choseNextVersion(glob.sync('package.json', { cwd })[0]);
  const nextNpmVersion = await npmVersion(nextNameNpmVersion);
  await gitCommit(nextNpmVersion);
  await gitPush();
  await npmPublish(cwd);
};
```

## Creating custom tasks

See `./tasks/*.ts` for examples.
