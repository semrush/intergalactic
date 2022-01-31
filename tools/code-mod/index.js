const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const run = require('./exec');

let DEFAULTS = {
  ignorePattern: '**/node_modules/**',
  extensions: 'js,jsx',
  parser: 'babylon',
};

async function addInquirer(type, name, message, choices = null, defaultValue = false) {
  return await inquirer.prompt([
    {
      type,
      name,
      message,
      choices,
      default: defaultValue,
    },
  ]);
}

async function getMigrationPath() {
  const { component } = await addInquirer(
    'list',
    'component',
    'Select the component:',
    fs.readdirSync(path.resolve(__dirname, 'transforms')),
  );

  const { migration } = await addInquirer(
    'list',
    'migration',
    'Select the migration:',
    fs.readdirSync(path.resolve(__dirname, 'transforms', component)),
  );

  return path.resolve(__dirname, 'transforms', component, migration);
}

async function getSourceFilesDir() {
  const { dir } = await inquirer.prompt({
    type: 'input',
    name: 'dir',
    message: 'Input relative path to dir with source files:',
    validate: async function (value) {
      fs.statSync(path.resolve(process.cwd(), value), (e) => {
        if (e) {
          return `Directory ${value} doesn't exist.\n Try again, please`;
        }
      });
      return true;
    },
  });

  return dir;
}

(async () => {
  const migrationPath = await getMigrationPath();
  const sourceDir = await getSourceFilesDir();
  const { confirm } = await addInquirer(
    'confirm',
    'confirm',
    `Would you like to change configuration?
     Parser: ${DEFAULTS.parser}
     File extensions: ${DEFAULTS.extensions}`,
    null,
    false,
  );

  if (confirm) {
    const parser = await addInquirer(
      'list',
      'parser',
      'Select the parser',
      ['babel', 'babylon', 'flow', 'ts', 'tsx'],
      DEFAULTS.parser,
    );

    const extensions = await addInquirer(
      'input',
      'extensions',
      'Enter file extensions (comma separated list)',
      null,
      DEFAULTS.extensions,
    );

    DEFAULTS = { ...DEFAULTS, ...parser, ...extensions };
  }

  run({
    migrationPath,
    sourceDir,
    ...DEFAULTS,
  });
})();
