const { execSync } = require('child_process');
const path = require('path');
const inquirer = require('inquirer');
const { removeCommandsFromArgv } = require('./getOptions');
const minimist = require('minimist');
const dotenv = require('dotenv');

const argv = process.argv.slice(2);
const cwdPath = process.cwd();
const rootPath = path.resolve(__dirname, '../../');
const args = minimist(argv);

module.exports.question = async function (args, params = {}) {
  const { name } = params;

  if (!args[name]) {
    try {
      const result = await inquirer.prompt([params]);
      return result[name];
    } catch (error) {
      console.log('Error', error);
      process.exit(0);
    }
  }
  return args[name];
};

module.exports.getTaskOptions = function () {
  return {
    argv,
    args,
    cwdPath,
    rootPath,
  };
};

module.exports.task = function (bashScript, usedKeys = []) {
  const { dotenv: pathToEnv } = args;

  try {
    const otherArgv = removeCommandsFromArgv(
      argv,
      [...usedKeys, 'dotenv'].map((name) => `--${name}`),
    ).join(' ');

    const env = pathToEnv
      ? Object.assign(process.env, dotenv.config({ path: path.resolve(pathToEnv) }).parsed)
      : process.env;

    execSync(`${bashScript} ${otherArgv}`, {
      env,
      stdio: 'inherit',
      cwd: rootPath,
    });
  } catch (error) {
    console.log('Error', error);
    process.exit(0);
  }
};
