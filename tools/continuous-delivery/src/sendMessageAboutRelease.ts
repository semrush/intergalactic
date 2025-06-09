import type { Changelog } from '@semcore/changelog-handler';
import { makeMessageFromChangelogs, sendMessage } from '@semcore/slack-integration';

import { log } from './utils';

export async function sendMessageAboutRelease(version: string, lastVersionChangelogs: Changelog[], endpoints: string[]) {
  log('Sending message to internal Slack...');

  try {
    const title = `New release v${version} is here!`;
    const body = makeMessageFromChangelogs(lastVersionChangelogs, false);

    await sendMessage({
      title,
      body,
      dryRun: false,
      endpoints,
    });
    log('Sent message to internal Slack.');
    log('Release note is published.');
  } catch (error) {
    console.error(error);
  }
}
