import { ChangelogChangeLabel } from '@semcore/changelog-handler';
import dayjs from 'dayjs';

const MAP_TYPE_TO_SECTION_LABEL = {
  added: ':white_check_mark: ADDED',
  changed: ':recycle: CHANGED',
  fixed: ':hammer_and_wrench: FIXED',
  removed: ':wastebasket: REMOVED',
  break: ':interrobang: BREAK',
} as const;

type Changelog = {
  component: string;
  version: string;
  changes: {
    component: string;
    label: 'Added' | 'Changed' | 'Fixed' | 'BREAK';
    description: string;
  }[];
};

export const makeMessageTitle = (dateFrom: string, dateTo: string) => {
  const startDate = dayjs(dateFrom);
  const endDate = dayjs(dateTo);
  const formattedStartDate = startDate.format(
    startDate.month() === endDate.month() ? 'DD' : 'DD MMMM',
  );
  const formattedEndDate = endDate.format('DD MMMM YYYY');

  return `:whale: Semcore updates from ${formattedStartDate} to ${formattedEndDate}`;
};

export const makeMessageBody = (changelogs: Changelog[]) =>
  changelogs
    .map(
      ({ component, version, changes }) =>
        titleTemplate(component, version) + bodyTemplate(changes),
    )
    .join('\n');

const titleTemplate = (name: string, version: string) =>
  `-------- \n:black_heart: *${name}* v${version} \n\n`;

const bodyTemplate = (changes: Changelog['changes']) => {
  const sections: Partial<{ [label in ChangelogChangeLabel]: string[] }> = {};
  for (const change of changes) {
    sections[change.label] = sections[change.label] || [];
    sections[change.label].push(change.description);
  }

  return Object.entries(sections).map(([label, changeDescriptions]) => {
    const title =
      label in MAP_TYPE_TO_SECTION_LABEL ? MAP_TYPE_TO_SECTION_LABEL[label] : label.toUpperCase();

    return (
      title +
      '\n' +
      changeDescriptions.map((changeDescription) => `- ${changeDescription}`).join('\n')
    );
  });
};
