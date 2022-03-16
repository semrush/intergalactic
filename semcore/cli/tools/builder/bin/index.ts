#!/usr/bin/env tsm

import execa from 'execa';
import minimist from 'minimist';
import {
  getOptionsFromArgv,
  removeCommandsFromArgv,
  getArgvFromObject,
} from '../../../scripts/utils/getOptions.js';

const argv = process.argv.slice(2);
const args = minimist(argv, {
  default: {
    source: 'ts',
  },
});

const { destination } = args;

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;

const runCommand = async <Command extends keyof typeof makeCommand>(
  commandName: Command,
  ...args: ArgumentTypes<typeof makeCommand[Command]>
) => {
  await execa.command(makeCommand[commandName].apply(null, args), { shell: true });
};

const babelArgs = {
  '--extensions': '.ts,.tsx,.js',
  '--ignore': '**/*.d.ts',
  '--presets': '@semcore/babel-preset-ui',
  '--no-babelrc': 1,
  '--source-maps': 1,
  '--copy-files': 1,
  '--no-copy-ignored': 1,
  ...getOptionsFromArgv(removeCommandsFromArgv(argv, ['--destination', '--source'])),
};

const MAP_BABEL_ENV = {
  cjs: 'commonjs',
  es6: 'es6',
} as const;

const makeCommand = {
  CLEANUP: () => `rm -rf ${destination}/lib`,
  TYPES: (output) =>
    `tsc --emitDeclarationOnly --baseUrl ${destination}/src --outDir ${destination}/lib/${output}`,
  COPY_TYPES: (output) =>
    `mkdir -p ${destination}/lib/${output} && find ${destination}/src -type f -name "*.d.ts" -exec cp {} ${destination}/lib/${output} ";"`,
  BABEL: (output, env) =>
    `babel ${destination}/src --out-dir ${destination}/lib/${output} --env-name=${env} ${getArgvFromObject(
      babelArgs,
    )}`,
} as const;

// eslint-disable-next-line no-console
console.log(`running builder from dir ${process.cwd()}\n`);

const tasks = [];
await runCommand('CLEANUP');

if (args.modules) {
  tasks.push(runCommand('BABEL', '', MAP_BABEL_ENV[args.modules]));
  tasks.push(
    runCommand(args.source === 'jsx' || args.source === 'js' ? 'COPY_TYPES' : 'TYPES', ''),
  );
} else {
  tasks.push(runCommand('BABEL', 'cjs', 'commonjs'));
  tasks.push(runCommand('BABEL', 'es6', 'es6'));
  tasks.push(
    runCommand(args.source === 'jsx' || args.source === 'js' ? 'COPY_TYPES' : 'TYPES', 'types'),
  );
}

await Promise.all(tasks);
