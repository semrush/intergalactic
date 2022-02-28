import path from 'path';
import chalk from 'chalk';
import { PublisherOptions } from './bin/cli';

export const runPublisherTasks = async function (options: PublisherOptions) {
  // eslint-disable-next-line no-console
  console.log(
    chalk.green(`Running publisher`) +
      chalk.gray(` with following options: ${JSON.stringify(options)}\n`),
  );

  const { publisherConfigFactory } = await import(path.join(process.cwd(), '.publisher'));
  const tasks = await publisherConfigFactory(options);

  return tasks.reduce(async (prev, next) => {
    const nextPlugin = await next;
    const prevResult = await prev;
    return nextPlugin(prevResult, options);
  }, Promise.resolve(options));
};
