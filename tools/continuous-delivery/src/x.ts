import dotenv from 'dotenv';
import { getReleaseChangelog } from '@semcore/changelog-handler';
import { sendMessage, makeMessageFromChangelogs } from '@semcore/slack-integration';

dotenv.config();
const semcoreUiChangelog = await getReleaseChangelog();
const version = semcoreUiChangelog.package.version;
const lastVersionChangelogs = semcoreUiChangelog.changelogs.slice(0, 1);

const title = `New release v${version} is here!`;
const body = makeMessageFromChangelogs(lastVersionChangelogs, false);

await sendMessage({
  title,
  body,
  dryRun: false,
});
