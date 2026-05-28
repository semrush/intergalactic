import axios from 'axios';

import type { ChangelogChangeLabel, ChangelogItem } from './changelog';

const type2SectionLabel: Record<ChangelogChangeLabel, string> = {
  Added: ':sparkles: Added',
  Changed: ':arrows_counterclockwise: Changed',
  Fixed: ':ladybug: Fixed',
  BREAK: ':warning: Break',
};

const BULLET = '•';

const formatBulletLine = (line: string) => `${BULLET} ${line}`;

const formatAssetReleaseVersion = (version: string, assetPrefix: 'icon' | 'illustration') => {
  const semver = version.startsWith(assetPrefix) ? version.slice(assetPrefix.length) : version;

  return semver.startsWith('v') ? semver : `v${semver}`;
};

export const makeTitleFromChangelogs = (version: string) => {
  if (version.startsWith('v')) {
    return `:whale2: Semcore Release ${version}`;
  }

  if (version.startsWith('icon')) {
    return `:art: Icon Release ${formatAssetReleaseVersion(version, 'icon')}\n- - -\n`;
  }

  if (version.startsWith('illustration')) {
    return `:art: Illustration Release ${formatAssetReleaseVersion(version, 'illustration')}\n- - -\n`;
  }

  throw new Error(`Unknown version: "${version}"`);
};

export const makeMessageFromChangelogs = (version: string, changelogs: ChangelogItem[]) => {
  if (version.startsWith('v')) {
    return changelogs.map((item) => bodyTemplate(item)).join('\n');
  }
  let component: 'icon' | 'illustration';

  if (version.startsWith('icon')) {
    component = 'icon';
  } else if (version.startsWith('illustration')) {
    component = 'illustration';
  } else {
    throw new Error(`Unknown version: "${version}"`);
  }

  const changes = changelogs.find((item) => item.component === `@semcore/${component}`);

  return changes?.changes.map((item) => {
    return formatBulletLine(`*${item.label}* ${item.description}`);
  }).join('\n') ?? '';
};

const formatComponentDisplayName = (component: string): string => {
  const name = component.replace(/^@semcore\//i, '');

  return name.charAt(0).toUpperCase() + name.slice(1);
};

const bodyTemplate = (changeItem: ChangelogItem) => {
  const sections = new Map<ChangelogChangeLabel, string[]>();
  for (const change of changeItem.changes) {
    if (change.label) {
      const changes = sections.get(change.label) ?? [];
      changes.push(change.description);
      sections.set(change.label, changes);
    }
  }

  const header = `- - -\n*${formatComponentDisplayName(changeItem.component)}*`;
  const sectionsText = Array.from(sections.entries())
    .map(([label, changeDescriptions]) => {
      const title = type2SectionLabel[label] ?? label.toUpperCase();
      const lines = changeDescriptions.map(formatBulletLine).join('\n');

      return lines ? `${title}\n${lines}` : title;
    })
    .join('\n');

  return sectionsText ? `${header}\n${sectionsText}` : header;
};

export const sendMessage = async ({
  endpoints,
  title,
  body,
  dryRun,
  image,
}: {
  endpoints: string[];
  title: string;
  body: string;
  dryRun: boolean;
  image?: {
    full: string;
    thumb: string;
  };
}) => {
  if (!title || !body) {
    throw new Error(
      `Empty title or body provided for slack update bot, got title: "${title}", body: "${body}"`,
    );
  }

  return Promise.all(
    endpoints.map((endpointUrl) => {
      let log = `Sending message to Slack\n===\nTitle: ${title}\nApi endpoint: ${endpointUrl}\n===\nMessage body is below:\n${body}\n===`;
      if (image) {
        log += `\nImage: ${image.full} (thumb ${image.thumb})\n===`;
      }

      console.log(log);

      if (dryRun) {
        console.log('Sending is canceled due to dry run');
        return null;
      }

      const attachment: {
        mrkdwn: true;
        title: string;
        text: string;
        image_url?: string;
        thumb_url?: string;
      } = {
        mrkdwn: true,
        title: title,
        text: body,
      };

      if (image) {
        attachment.image_url = image.full;
        attachment.thumb_url = image.thumb;
      }

      return axios({
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        data: { attachments: [attachment] },
        url: endpointUrl,
      });
    }),
  );
};

export const validateSlackIntegrationEnv = (endpoints: string[]) => {
  if (endpoints.length === 0) {
    throw new Error(
      'Slack integration expects env.SLACK_API_ENDPOINTS to be provided but got empty or non-existing value',
    );
  }

  const invalidUrls = endpoints
    .map((endpointUrl, index) => ({ endpointUrl, index: index + 1 }))
    .filter(({ endpointUrl }) => !endpointUrl.includes('slack'))
    .map(({ index }) => index);
  if (invalidUrls.length > 0) {
    const invalidUrlsString = invalidUrls.join(', ');
    throw new Error(
      `Slack integration expects env.SLACK_API_ENDPOINTS to contain coma separated list of urls and each of url to contain slack url, but got url without mentioning "slack" word in following urls (indexed from 1): ${invalidUrlsString}`,
    );
  }
};
