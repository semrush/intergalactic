#!/usr/bin/env tsm

import execa from 'execa';
import mri from 'mri';
import { resolve as resolvePath } from 'path';
import { fileURLToPath } from 'url';

const argv = mri<{
  source: string;
  modules: string;
  dir: string;
}>(process.argv.slice(2), {
  default: {
    source: 'ts',
  },
});

const babelPresetPackagePath = resolvePath(
  fileURLToPath(import.meta.url),
  '../../../babel-preset-ui',
);
const workingDir = process.cwd();
process.chdir(babelPresetPackagePath);

const makeCommand = {
  CLEANUP: () => `rm -rf ${workingDir}/lib`,
  TYPES: (output: string) =>
    `tsc --emitDeclarationOnly --baseUrl ${workingDir}/src --project ${workingDir}/tsconfig.json --outDir ${workingDir}/lib/${output}`,
  COPY_TYPES: (output: string) =>
    `mkdir -p ${workingDir}/lib/${output} && find ${workingDir}/src -type f -name "*.d.ts" -exec cp {} ${workingDir}/lib/${output} ";"`,
  BABEL: (output: string, babelArgs: string) =>
    `pnpm babel ${workingDir}/src --out-dir ${workingDir}/lib/${output} ${babelArgs}`,
} as const;

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;

const runCommand = async <Command extends keyof typeof makeCommand>(
  commandName: Command,
  ...args: ArgumentTypes<typeof makeCommand[Command]>
) => {
  return await execa.command(makeCommand[commandName].apply(null, args), { shell: true });
};

const MAP_BABEL_ENV = {
  cjs: 'commonjs',
  es6: 'es6',
} as const;

// eslint-disable-next-line no-console
console.log(`running builder from dir ${process.cwd()}\n`);

await runCommand('CLEANUP');

const source = argv.source.split(',');

if (argv.modules) {
  const envName = MAP_BABEL_ENV[argv.modules];
  await runCommand(
    'BABEL',
    '',
    `--extensions .ts,.tsx,.js,.jsx --ignore **/*.d.ts --presets @semcore/babel-preset-ui --no-babelrc --source-maps --copy-files --env-name=${envName}`,
  );
  if (argv.modules === 'cjs') {
    const mjsImportsBabelrc = resolvePath(
      fileURLToPath(import.meta.url),
      '../../mjs-imports-babelrc.js',
    );
    await runCommand(
      'BABEL',
      '',
      `--extensions .ts,.tsx,.js,.jsx --ignore **/*.d.ts --presets @semcore/babel-preset-ui,${mjsImportsBabelrc} --no-babelrc --source-maps --copy-files --out-file-extension .mjs --env-name=es6`,
    );
  }
  if (source.includes('jsx') || source.includes('js')) await runCommand('COPY_TYPES', '');
  if (source.includes('tsx') || source.includes('ts')) await runCommand('TYPES', '');
} else {
  await runCommand(
    'BABEL',
    'cjs',
    '--extensions .ts,.tsx,.js,.jsx --ignore **/*.d.ts --presets @semcore/babel-preset-ui --no-babelrc --source-maps --copy-files --env-name=commonjs',
  );
  await runCommand(
    'BABEL',
    'es6',
    '--extensions .ts,.tsx,.js,.jsx --ignore **/*.d.ts --presets @semcore/babel-preset-ui --no-babelrc --source-maps --copy-files --env-name=es6',
  );
  if (source.includes('jsx') || source.includes('js')) await runCommand('COPY_TYPES', 'types');
  if (source.includes('tsx') || source.includes('ts')) await runCommand('TYPES', 'types');
}
