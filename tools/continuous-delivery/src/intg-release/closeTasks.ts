import Git from 'simple-git';
import { log } from '../utils';
import fetch from 'node-fetch';
import * as crypto from 'crypto';

const git = Git();

export const closeTasks = async (version: string) => {
  const tags = await git.tags();
  const latestTag = tags.latest;

  if (!latestTag) {
    log('No latest tag, skip');
    return;
  }

  const logs = await git.log({ from: latestTag });
  const regexp = new RegExp(/\[(.*?)\]\[(.*?)\]/gi);
  const taskIds = logs.all
    .map((item) => {
      const result = [...item.message.matchAll(regexp)][0];

      if (result?.[1]) {
        return result[1];
      }

      return undefined;
    })
    .filter(Boolean);

  log(`Tasks to close: [${taskIds.join(' ; ')}]`);

  try {
    const closeTasksUrl = process.env['INTERGALACTIC_BOT_CLOSE_TASKS_URL'];
    const ingBotSecret = process.env['INTERGALACTIC_BOT_SECRET'];

    if (!closeTasksUrl || !ingBotSecret) {
      throw new Error(
        'You must set INTERGALACTIC_BOT_CLOSE_TASKS_URL and INTERGALACTIC_BOT_SECRET env variable',
      );
    }

    const body = JSON.stringify({
      taskIds,
      fixVersion: version,
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
