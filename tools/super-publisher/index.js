const path = require('path');
const chalk = require('chalk');
const figlet = require('figlet');

module.exports = async function(args) {
  console.log(chalk.yellow(figlet.textSync('Ö Б Н У Л И С Ь !', { font: 'Banner' })));
  console.log('\n\n');

  const taskRunner = require(path.join(process.cwd(), '.publisher'));
  let tasks = await taskRunner(args);

  return tasks.reduce(async (prev, next) => {
    const nextPlugin = await next;
    const prevResult = await prev;
    return nextPlugin(prevResult, args);
  }, Promise.resolve(args));
};
