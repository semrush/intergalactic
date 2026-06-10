import { log } from './utils';
import type { ChangelogItem } from './utils/changelog';
import { makeTitleFromChangelogs, makeMessageFromChangelogs, sendMessage } from './utils/slackIntegration';

export async function sendMessageAboutRelease(version: string, lastVersionChangelogs: ChangelogItem[], endpoints: string[]) {
  log('Sending message to internal Slack...');

  try {
    const title = makeTitleFromChangelogs(version);
    const body = makeMessageFromChangelogs(version, lastVersionChangelogs);

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
