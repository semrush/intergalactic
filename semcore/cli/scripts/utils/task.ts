import { execSync } from 'child_process';
import path from 'path';
import inquirer from 'inquirer';
import { removeCommandsFromArgv } from './getOptions';
import minimist from 'minimist';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
const __dirname = fileURLToPath(new URL('.', import.meta.url));

const argv = process.argv.slice(2);
const cwdPath = process.cwd();
const rootPath = path.resolve(__dirname, '../../');
const args = minimist(argv);

export const question = async function (
  args: { [key: string]: string },
  params: { [key: string]: any } = {},
) {
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

export const getTaskOptions = function () {
  return {
    argv,
    args,
    cwdPath,
    rootPath,
  };
};

export const task = function (bashScript: string, usedKeys: string[] = []) {
  const { dotenv: pathToEnv } = args;

  try {
    const otherArgv = removeCommandsFromArgv(
      argv,
      [...usedKeys, 'dotenv'].map((name) => (name === '.' ? name : `--${name}`)),
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
