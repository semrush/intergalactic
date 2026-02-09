import { log } from './utils';
import type { ChangelogItem } from './utils/changelog';
import { makeMessageFromChangelogs, sendMessage } from './utils/slackIntegration';

export async function sendMessageAboutRelease(version: string, lastVersionChangelogs: ChangelogItem[], endpoints: string[]) {
  log('Sending message to internal Slack...');

  try {
    const title = `New release ${version} is here!`;
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
