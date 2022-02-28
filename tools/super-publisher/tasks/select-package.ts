import fs from 'fs';
import path from 'path';
import execa from 'execa';
import inquirer from 'inquirer';
import { createTask } from '../task';

export const selectPackageTask = createTask('Choose package', async (opt, args) => {
  const many = args.many || args.package?.includes(',');

  if (many) {
    let components = [];

    if (args.package?.includes(',')) {
      components = args.package.split(',');
    } else {
      const promptResult = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'components',
          message: 'Select the components:',
          choices: fs.readdirSync(args.root),
        },
      ]);

      components = promptResult.components;
    }

    await components.reduce(async (task, component) => {
      await task;
      const [command, ...parentArgs] = args.rawArgs.filter(
        (arg, argIndex) => arg !== '--package' && args.rawArgs[argIndex - 1] !== '--package',
      );

      return execa(command, [...parentArgs, '--package', component], {
        stdin: 'inherit',
        stdout: 'inherit',
      });
    }, Promise.resolve());

    process.exit();
  } else {
    if (args.package) {
      opt.log(args.package.toUpperCase());
      opt.root = path.join(path.resolve(args.root), args.package);
    } else {
      const value = await inquirer.prompt([
        {
          type: 'list',
          name: 'component',
          message: 'Select the component:',
          choices: fs.readdirSync(args.root),
        },
      ]);

      opt.root = path.join(path.resolve(args.root), value.component);
    }
  }

  return opt;
});
