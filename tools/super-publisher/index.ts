import path from 'path';
import chalk from 'chalk';
import { PublisherOptions } from './bin/cli';

export const runPublisherTasks = async function (options: PublisherOptions) {
  // eslint-disable-next-line no-console
  console.log(
    chalk.green(`Running publisher`) +
      chalk.gray(` with following options: ${JSON.stringify(options)}\n`),
  );
  const { publisherConfigFactory } = await import(options.tasks || path.join(process.cwd(), '.publisher'));
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
