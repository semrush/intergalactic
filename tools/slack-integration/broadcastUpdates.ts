import { makeMessageFromChangelogs } from './makeMessage';
import { Changelog, collectComponentChangelogs } from '@semcore/changelog-handler';
import { sendMessage } from './sendMessage';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween.js';
dayjs.extend(isBetween);

const makeMessageTitle = (dateFrom: string, dateTo: string) => {
  const startDate = dayjs(dateFrom);
  const endDate = dayjs(dateTo);
  const formattedStartDate = startDate.format(
    startDate.month() === endDate.month() ? 'DD' : 'DD MMMM',
  );
  const formattedEndDate = endDate.format('DD MMMM YYYY');

  return `:whale: Semcore updates from ${formattedStartDate} to ${formattedEndDate}`;
};

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

export const broadcastUpdates = async ({
  startDate,
  endDate,
  dryRun,
}: {
  startDate: string;
  endDate: string;
  dryRun: boolean;
}) => {
  const packages = await collectComponentChangelogs();
  const changelogs = packages.map(({ changelogs }) => changelogs).flat();
  const filteredChangelogs = filterAutomaticChanges(filterByDate(changelogs, startDate, endDate));
  const title = makeMessageTitle(startDate, endDate);
  const body = makeMessageFromChangelogs(filteredChangelogs, true);

  return await sendMessage({ title, body, dryRun });
};
