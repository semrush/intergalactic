import axios from 'axios';

import type { ChangelogChangeLabel, ChangelogItem } from './changelog';

const type2SectionLabel: Record<string, string> = {
  added: ':sparkles: Added',
  changed: ':arrows_counterclockwise: Changed',
  fixed: ':ladybug: Fixed',
  removed: ':wastebasket: Removed',
  break: ':warning: Break',
};

export const makeMessageFromChangelogs = (changelogs: ChangelogItem[], withVersions: boolean) =>
  changelogs.map((item) => bodyTemplate(item, withVersions)).join('\n');

const formatComponentDisplayName = (component: string): string => {
  const name = component.replace(/^@semcore\//i, '');

  if (!name) {
    return component;
  }

  return name.charAt(0).toUpperCase() + name.slice(1);
};

const titleTemplate = (name: string, version: string | null) =>
  `\n- - - \n*${formatComponentDisplayName(name)}* ${version ? `v${version}` : ''} \n\n`;

const bodyTemplate = (changeItem: ChangelogItem, withVersions: boolean) => {
  const sections: Partial<{ [label in NonNullable<ChangelogChangeLabel>]: string[] }> = {};
  for (const change of changeItem.changes) {
    if (change.label) {
      sections[change.label] = sections[change.label] || [];
      sections[change.label]?.push(change.description);
    }
  }

  return (
    titleTemplate(changeItem.component, withVersions ? changeItem.version : null) +
    Object.entries(sections)
      .map(([label, changeDescriptions]) => {
        const title = label in type2SectionLabel ? type2SectionLabel[label] : label.toUpperCase();

        return (
          title +
          '\n' +
          changeDescriptions.map((changeDescription) => `• ${changeDescription}`).join('\n')
        );
      })
      .join('\n')
  );
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
