import { log } from './utils';
import { makeMessageFromChangelogs, sendMessage } from '@semcore/slack-integration';
import type { Changelog } from '@semcore/changelog-handler';

export async function sendMessageAboutRelease(version: string, lastVersionChangelogs: Changelog[]) {
  log('Sending message to internal Slack...');

  try {
    const title = `New release v${version} is here!`;
    const body = makeMessageFromChangelogs(lastVersionChangelogs, false);

    await sendMessage({
      title,
      body,
      dryRun: false,
    });
    log('Sent message to internal Slack.');
    log('Release note is published.');
  } catch (error) {
    console.error(error);
  }
}
