import axios from 'axios';
import { makeMessageBody, makeMessageTitle } from './makeMessage';
import { Changelog, collectComponentChangelogs } from '@semcore/changelog-handler';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween.js';
dayjs.extend(isBetween);

const filterByDate = (changelogs: Changelog[], startDate: string, endDate: string) =>
  changelogs.filter(
    (changelog) =>
      dayjs(changelog.date).isValid() &&
      dayjs(changelog.date).isBetween(startDate, endDate, 'd', '[)'),
  );
const filterAutomaticChanges = (changelogs: Changelog[]) =>
  changelogs
    .map(({ changes, ...changelog }) => ({
      ...changelog,
      changes: changes.filter((change) => !change.isAutomatic),
    }))
    .filter((changelog) => changelog.changes.length > 0);

export const sendUiKitUpdates = async ({
  startDate,
  endDate,
  endpoints,
  dryRun,
}: {
  startDate: string;
  endDate: string;
  endpoints: string[];
  dryRun: boolean;
}) => {
  const packages = await collectComponentChangelogs();
  const changelogs = packages.map(({ changelogs }) => changelogs).flat();
  const filteredChangelogs = filterAutomaticChanges(filterByDate(changelogs, startDate, endDate));
  const title = makeMessageTitle(startDate, endDate);
  const body = makeMessageBody(filteredChangelogs);

  return await sendMessage({ endpoints, title, body, dryRun });
};

const sendMessage = async ({
  endpoints,
  title,
  body,
  dryRun,
}: {
  endpoints: string[];
  title: string;
  body: string;
  dryRun: boolean;
}) => {
  if (!title || !body) {
    throw new Error(
      `Empty title or body provided for slack update bot, got title: "${title}", body: "${body}"`,
    );
  }

  return Promise.all(
    endpoints.map((endpointUrl) => {
      // eslint-disable-next-line no-console
      console.log(
        `Sending message to Slack\n===\nTitle: ${title}\nApi endpoint: ${endpointUrl}\n===\nMessage body is below:\n${body}\n===`,
      );

      if (dryRun) {
        return null;
      }

      return axios({
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        data: {
          attachments: [
            {
              mrkdwn: true,
              title: title,
              text: body,
            },
          ],
        },
        url: endpointUrl,
      });
    }),
  );
};
