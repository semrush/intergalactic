import * as crypto from 'crypto';

import Git from 'simple-git';

import { log, prerelaseSuffix } from '../utils';
import { allowedScopes } from '../utils/allowedScopes';

const git = Git();

export const closeTasks = async (versionTag: string) => {
  let match = 'v*';

  if (versionTag.startsWith('icon')) {
    match = `icon*`;
  } else if (versionTag.startsWith('illustration')) {
    match = `illustrations*`;
  }

  const tags = await git.tags([match, '--sort', 'creatordate']);
  const releaseTags = tags.all.filter((tag) => !tag.includes(prerelaseSuffix));
  const currentReleaseTagIndex = releaseTags.findIndex((tag) => tag === versionTag);
  const prevReleaseTag = releaseTags[currentReleaseTagIndex - 1];
  const logs = await git.log({ from: prevReleaseTag });
  const regexp = new RegExp(/\[(.*?)\]/gi);
  const taskIds = new Set<string>();
  const { specialScopes, toolsComponents, semcoreComponents } = await allowedScopes();
  const allAllowedScopes = [...specialScopes, ...semcoreComponents, ...toolsComponents];

  logs.all.forEach((item) => {
    const result = [...item.message.matchAll(regexp)][0];

    if (result?.[1] && !allAllowedScopes.includes(result[1])) {
      taskIds.add(result[1]);
    }
  });

  const taskIdsArray = [...taskIds];

  log(`Tasks to close: [${taskIdsArray.join(' ; ')}]`);

  try {
    const closeTasksUrl = process.env['INTERGALACTIC_BOT_CLOSE_TASKS_URL'];
    const ingBotSecret = process.env['INTERGALACTIC_BOT_SECRET'];

    if (!closeTasksUrl || !ingBotSecret) {
      throw new Error(
        'You must set INTERGALACTIC_BOT_CLOSE_TASKS_URL and INTERGALACTIC_BOT_SECRET env variable',
      );
    }

    let fixVersion: string | undefined = undefined;

    if (versionTag.startsWith('v')) {
      fixVersion = versionTag.slice(1);
    }

    const body = JSON.stringify({
      taskIds: taskIdsArray,
      fixVersion,
    });

    const signature = crypto.createHmac('sha256', ingBotSecret).update(body).digest('hex');

    await fetch(closeTasksUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Intergalactic-Secret': signature,
      },
      body,
    });
  } catch (e) {
    log((e as Error).message);
  }
};
