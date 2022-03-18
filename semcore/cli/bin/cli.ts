#!/usr/bin/env tsm
import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = fileURLToPath(new URL('.', import.meta.url));

const argv = process.argv.slice(2);

const MAP_HELP_OPTIONS = {
  '--name': 'component name',
  '--component': 'component name',
  '--destination': 'component folder name',
  '.': 'use current folder path',
  '--dotenv': ' path to file .env',
};

const MAP_HELP_TASKS = {
  component: {
    description: 'You can to create component from template',
    options: ['--name', '--destination'],
  },
  build: {
    description: 'You can to build component with babel',
    options: [
      '--component',
      '--destination',
      'additional parameters from https://babeljs.io/docs/en/babel-cli',
    ],
  },
  test: {
    description: 'You can to test component with jest',
    options: [
      '--component',
      '--destination',
      'additional parameters from https://jestjs.io/docs/cli',
    ],
  },
  lint: {
    description: 'You can to lint components with eslint and type check',
    options: ['--destination'],
  },
  pub: {
    description: 'You can to publish component with @semcore/super-publisher',
    options: ['--destination', 'additional parameters from @semcore/super-publisher'],
  },
};

const ALL_HEAVE_HELLP_TASKS = ['.', '--dotenv'];
const taskNames = Object.keys(MAP_HELP_TASKS);

function printOptionsHelp(name) {
  return (
    MAP_HELP_TASKS[name].options
      .map((optionName) => `${optionName}   ${MAP_HELP_OPTIONS[optionName] || ''}`)
      .join('\n    ') +
    '\n    ' +
    ALL_HEAVE_HELLP_TASKS.map(
      (optionName) => `${optionName}   ${MAP_HELP_OPTIONS[optionName]}`,
    ).join('\n    ')
  );
}

function printTaskHelp(name) {
  const task = MAP_HELP_TASKS[name];
  return `
Task name:
  ${name}     ${task.description}
  
  Options:
    ${printOptionsHelp(name, true)}
  `;
}

if (argv.includes('-h') || argv.includes('--help')) {
  const taskNameFromArgv = taskNames.find((name) => argv.includes(name));

  if (taskNameFromArgv) {
    console.log(`
Usage: semcore ${taskNameFromArgv} [options]
  ${printTaskHelp(taskNameFromArgv)}
`);
  } else {
    console.log(`
Usage: semcore [task name] [options]

  ${taskNames.map((name) => printTaskHelp(name)).join('\n  ')}
`);
  }

  process.exit(1);
}

process.on('unhandledRejection', (err) => {
  throw err;
});

const scriptIndex = argv.findIndex((x) => taskNames.includes(x));
const scriptName = scriptIndex === -1 ? argv[0] : argv[scriptIndex];
const nodeArgv = scriptIndex > 0 ? argv.slice(0, scriptIndex) : [];

if (taskNames.includes(scriptName)) {
  const result = runTask(scriptName);
  if (result.signal) {
    if (result.signal === 'SIGKILL') {
      console.log('The build failed because the process exited too early. ');
    } else if (result.signal === 'SIGTERM') {
      console.log('The build failed because the process exited too early. ');
    }
    process.exit(1);
  }
  process.exit(result.status);
} else {
  console.log('Unknown script "' + scriptName + '".');
}

function runTask(scriptName) {
  const task = path.resolve(__dirname, `../scripts/${scriptName}.ts`);
  return spawnSync('tsm', nodeArgv.concat(task).concat(argv.slice(scriptIndex + 1)), {
    stdio: 'inherit',
    shell: true,
  });
}
