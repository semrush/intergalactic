const path = require('path');
const chalk = require('chalk');
const { get } = require('axios');

module.exports = async function (args) {
  console.log(chalk.green('Starting super publisher\n'));
  try {
    const {
      data: {
        contents: { jokes },
      },
    } = await get(`https://api.jokes.one/jod`, { headers: { 'Content-Type': 'application/json' } });
    console.log(chalk.yellow(jokes[0].joke.text));
    console.log('\n\n');
  } catch (err) {}

  const taskRunner = require(path.join(process.cwd(), '.publisher'));
  let tasks = await taskRunner(args);

  return tasks.reduce(async (prev, next) => {
    const nextPlugin = await next;
    const prevResult = await prev;
    return nextPlugin(prevResult, args);
  }, Promise.resolve(args));
};
