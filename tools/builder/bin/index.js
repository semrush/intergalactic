#!/usr/bin/env node

const execa = require('execa');

const argv = require('minimist')(process.argv.slice(2), {
  default: {
    source: 'ts',
  },
});

async function run(name, ...args) {
  await execa.command(BUILD[name](...args), { shell: true });
}

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
};

const BUILD = {
  CLEANUP: () => 'rm -rf ./lib',
  TYPES: (output) => `tsc --emitDeclarationOnly --baseUrl ./src --outDir ./lib/${output}`,
  COPY_TYPES: (output) =>
    `mkdir -p ./lib/${output} && find ./src -type f -name "*.d.ts" -exec cp {} ./lib/${output} ";"`,
  BABEL: (output, env) => `babel ./src --out-dir ./lib/${output} --env-name=${env} ${babelArgs}`,
};

async function main() {
  const tasks = [];
  await run('CLEANUP');

  if (argv.modules) {
    tasks.push(run('BABEL', '', MAP_BABEL_ENV[argv.modules]));
    tasks.push(run(argv.source === 'js' ? 'COPY_TYPES' : 'TYPES', ''));
  } else {
    tasks.push(run('BABEL', 'cjs', 'commonjs'));
    tasks.push(run('BABEL', 'es6', 'es6'));
    tasks.push(run(argv.source === 'js' ? 'COPY_TYPES' : 'TYPES', 'types'));
  }

  await Promise.all(tasks);
}

console.log('RUN', process.cwd(), '\n');
main();
