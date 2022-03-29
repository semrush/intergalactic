import dotenv from 'dotenv';
dotenv.config();

export const validateSlackIntegrationEnv = () => {
  const endpoints = process.env['SLACK_API_ENDPOINTS']?.split(',') ?? [];

  if (endpoints.length === 0) {
    throw new Error(
      `Slack integration expects env.SLACK_API_ENDPOINTS to be provided but got empty or non-existing value`,
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
