import { collectComponentChangelogs } from './collectComponentChangelogs';

export const lintChangelogs = async () => {
  await collectComponentChangelogs();
};
