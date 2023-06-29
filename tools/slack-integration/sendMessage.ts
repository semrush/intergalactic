import axios from 'axios';
import dotenv from 'dotenv';
import { validateSlackIntegrationEnv } from './validateEnv';
dotenv.config();

export const sendMessage = async ({
  title,
  body,
  dryRun,
  image,
}: {
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

  if (!dryRun) {
    validateSlackIntegrationEnv();
  }

  const endpoints = process.env['SLACK_API_ENDPOINTS']?.split(',') ?? ['fake-url'];

  return Promise.all(
    endpoints.map((endpointUrl) => {
      let log = `Sending message to Slack\n===\nTitle: ${title}\nApi endpoint: ${endpointUrl}\n===\nMessage body is below:\n${body}\n===`;
      if (image) {
        log += `\nImage: ${image.full} (thumb ${image.thumb})\n===`;
      }

      // rome-ignore lint/nursery/noConsoleLog: <explanation>
      console.log(log);

      if (dryRun) {
        // rome-ignore lint/nursery/noConsoleLog: <explanation>
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
