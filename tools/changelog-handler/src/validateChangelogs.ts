import { getReleaseChangelog } from './getReleaseChangelog';
import { collectComponentChangelogs } from './collectComponentChangelogs';

export const validateChangelogs = async () => {
  await Promise.all([getReleaseChangelog(), collectComponentChangelogs()]);
};
