# legacy-publisher

Package is purposed to make monorepo publishing easer.

## Getting started

### Installing

`pnpm add -D legacy-publisher`

### Usage

`pnpm legacy-publisher`

### Конфигурация

`.legacy-publisher.ts`

```ts
import { chosePackagesTask } from './node_modules/legacy-publisher/tasks/chosePackages';
import { lintTask } from './node_modules/legacy-publisher/tasks/prettier';
import { testTask } from './node_modules/legacy-publisher/tasks/jest';
import { showGitDiffTask } from './node_modules/legacy-publisher/tasks/showGitDiff';
import { choseNextVersionTask } from './node_modules/legacy-publisher/tasks/choseNextVersion';
import { npmVersionTask } from './node_modules/legacy-publisher/tasks/npmVersion';
import { gitCommitTask } from './node_modules/legacy-publisher/tasks/gitCommit';
import { gitPushTask } from './node_modules/legacy-publisher/tasks/gitPush';
import { npmPublishTask } from './node_modules/legacy-publisher/tasks/npmPublish';

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
