#!/usr/bin/env tsm

import execa from 'execa';
import minimist from 'minimist';

const argv = minimist<{
  source: string;
}>(process.argv.slice(2), {
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
  '--extensions .ts,.tsx,.js,.jsx',
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

await runCommand('CLEANUP');

const source = argv.source.split(',');

if (argv.modules) {
  await runCommand('BABEL', '', MAP_BABEL_ENV[argv.modules]);
  if (source.includes('jsx') || source.includes('js')) await runCommand('COPY_TYPES', '');
  if (source.includes('tsx') || source.includes('ts')) await runCommand('TYPES', '');
} else {
  await runCommand('BABEL', 'cjs', 'commonjs');
  await runCommand('BABEL', 'es6', 'es6');
  if (source.includes('jsx') || source.includes('js')) await runCommand('COPY_TYPES', 'types');
  if (source.includes('tsx') || source.includes('ts')) await runCommand('TYPES', 'types');
}
