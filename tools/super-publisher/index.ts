import path from 'path';
import pc from 'picocolors';
import { PublisherOptions } from './bin/cli';

export const runPublisherTasks = async function (options: PublisherOptions) {
  // eslint-disable-next-line no-console
  console.log(
    pc.green(`Running publisher`) +
      pc.gray(` with following options: ${JSON.stringify(options)}\n`),
  );

  const { publisherConfigFactory } = await import(path.join(process.cwd(), '.publisher'));
  const tasks = await publisherConfigFactory(options);

  return tasks.reduce(async (prev, next, index) => {
    const nextPlugin = await next;
    const prevResult = await prev;
    if (!prevResult) {
      throw new Error(`Got empty (${prevResult}) result from task #${index + 1}`);
    }
    return nextPlugin(prevResult, options);
  }, Promise.resolve(options));
};
