import { collectComponentChangelogs } from './collectComponentChangelogs';
import { getReleaseChangelog } from './getReleaseChangelog';

export const validateChangelogs = async () => {
  await Promise.all([getReleaseChangelog(), collectComponentChangelogs()]);
};
