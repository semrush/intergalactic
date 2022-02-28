import { template } from './template';
import dayjs from 'dayjs';
import { ChangelogChangeLabel } from '@semcore/changelog-handler';

type Changelog = {
  date: string;
  version: string;
  changes: {
    component: string;
    label: 'Added' | 'Changed' | 'Fixed' | 'BREAK';
    description: string;
  }[];
};

const styles = (label: ChangelogChangeLabel) => {
  const commonStyle =
    'color:#FFFFFF;border-radius:6px;width:64px;height:20px;font-size:10px;text-align:center;padding-top:5px;padding-bottom:5px;';
  if (label === 'Added')
    return commonStyle + 'background:#00BC98;padding-right:15px;padding-left:15px;';
  else if (label === 'Changed')
    return commonStyle + 'background:#FF9400;padding-right:9px;padding-left:9px;';
  else if (label === 'Fixed')
    return commonStyle + 'background:#0070CC;padding-right:17px;padding-left:17px;';
  else if (label === 'BREAK')
    return commonStyle + 'background:#F71939;padding-right:13px;padding-left:13px;';
};

const buildHtml = (changes: Changelog['changes']) =>
  changes.map(
    (change) =>
      '<div class="title" style="color:#171A22;font-weight:bold;font-size:18px;line-height:26px;margin:20px 0 11px;">' +
      change.component +
      '</div>' +
      `<span class=${change.label} style=${styles(change.label)}>` +
      change.label +
      '</span>' +
      '<span class="desc" style="color:#171A22;font-size:14px;line-height:150%;margin-left:8px">' +
      change.description +
      '</span>',
  );

export const generateReleaseMailText = (changelogs: Changelog[], date: Date = new Date()) => {
  const changelogMeta = changelogs.find(({ date }) => date === dayjs(date).format('YYYY-MM-DD'));

  if (!changelogMeta) {
    throw new Error(`Unable to find a changelog for ${dayjs(date).format('YYYY-MM-DD')}`);
  }

  const releaseVersion = changelogMeta.version;
  const releaseDate = dayjs(date).format('MMMM DD');
  const chg = buildHtml(changelogMeta.changes);

  return template(releaseDate, releaseVersion, chg.join(''));
};
