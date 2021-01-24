const fs = require('fs');
const path = require('path');
const execa = require('execa');
const inquirer = require('inquirer');
const task = require('../task');

module.exports = task('Choose package', async (opt, args) => {
  if (args.package) {
    opt.log(args.package.toUpperCase());
    opt.root = path.join(path.resolve(args.root), args.package);
  } else if (args.many) {
    let value = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'components',
        message: 'Select the components:',
        choices: fs.readdirSync(args.root),
      },
    ]);

    await value.components.reduce(async (task, c) => {
      await task;
      const [command, ...parentArgs] = args.rawArgs;
      return execa(command, [...parentArgs, '--package', c], {
        stdin: 'inherit',
        stdout: 'inherit',
      });
    }, Promise.resolve());

    process.exit(0);
  } else {
    let value = await inquirer.prompt([
      {
        type: 'list',
        name: 'component',
        message: 'Select the component:',
        choices: fs.readdirSync(args.root),
      },
    ]);

    opt.root = path.join(path.resolve(args.root), value.component);
  }

  return opt;
});
