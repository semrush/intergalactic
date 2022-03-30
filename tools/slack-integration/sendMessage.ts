import axios from 'axios';
import dotenv from 'dotenv';
import { validateSlackIntegrationEnv } from './validateEnv';
dotenv.config();

export const sendMessage = async ({
  title,
  body,
  dryRun,
}: {
  title: string;
  body: string;
  dryRun: boolean;
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
      // eslint-disable-next-line no-console
      console.log(
        `Sending message to Slack\n===\nTitle: ${title}\nApi endpoint: ${endpointUrl}\n===\nMessage body is below:\n${body}\n===`,
      );

      if (dryRun) {
        // eslint-disable-next-line no-console
        console.log(`Sending is canceled due to dry run`);
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
