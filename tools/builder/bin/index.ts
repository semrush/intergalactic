#!/usr/bin/env tsm

import execa from 'execa';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2), {
  default: {
    source: 'ts',
  },
});

const makeCommand = {
  CLEANUP: () => 'rm -rf ./lib',
  TYPES: (output: string) => `tsc --emitDeclarationOnly --baseUrl ./src --outDir ./lib/${output}`,
  COPY_TYPES: (output: string) =>
    `mkdir -p ./lib/${output} && find ./src -type f -name "*.d.ts" -exec cp {} ./lib/${output} ";"`,
  BABEL: (output: string, env: string) =>
    `babel ./src --out-dir ./lib/${output} --env-name=${env} ${babelArgs}`,
} as const;

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;

const runCommand = async <Command extends keyof typeof makeCommand>(
  commandName: Command,
  ...args: ArgumentTypes<typeof makeCommand[Command]>
) => {
  await execa.command(makeCommand[commandName].apply(null, args), { shell: true });
};

const babelArgs = [
  '--extensions .ts,.tsx,.js',
  '--ignore **/*.d.ts',
  '--presets @semcore/babel-preset-ui',
  '--no-babelrc',
  '--source-maps',
  '--copy-files',
  '--no-copy-ignored',
].join(' ');

const MAP_BABEL_ENV = {
  cjs: 'commonjs',
  es6: 'es6',
} as const;

// eslint-disable-next-line no-console
console.log(`running builder from dir ${process.cwd()}\n`);

const tasks = [];
await runCommand('CLEANUP');

if (argv.modules) {
  tasks.push(runCommand('BABEL', '', MAP_BABEL_ENV[argv.modules]));
  tasks.push(runCommand(argv.source === 'js' ? 'COPY_TYPES' : 'TYPES', ''));
} else {
  tasks.push(runCommand('BABEL', 'cjs', 'commonjs'));
  tasks.push(runCommand('BABEL', 'es6', 'es6'));
  tasks.push(runCommand(argv.source === 'js' ? 'COPY_TYPES' : 'TYPES', 'types'));
}

await Promise.all(tasks);
