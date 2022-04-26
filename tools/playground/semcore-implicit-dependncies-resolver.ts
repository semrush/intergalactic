import esbuild from 'esbuild';
import { dirname as resolveDirname, resolve as resolvePath } from 'path';
import { readFile } from 'fs/promises';

type EsbuildResolver = (
  path: string,
  options?: esbuild.ResolveOptions,
) => Promise<esbuild.ResolveResult>;
const extractCssDependencies = async (
  path: string,
  resolver: EsbuildResolver,
): Promise<string[]> => {
  const contents = await readFile(path, 'utf-8');
  const lines = contents.split('\n');
  const imports = lines
    .filter((line) => line.startsWith('@import '))
    .map((line) => line.substring("@import '".length, line.length - "';".length));
  const dirname = resolveDirname(path);
  const resolvedImports = await Promise.all(
    imports.map((importPath) => resolver(importPath, { resolveDir: dirname })),
  );
  const cssPaths = resolvedImports.map(({ path }) => path);

  const nestedDependencies = await Promise.all(
    cssPaths.map((path) => extractCssDependencies(path, resolver)),
  );

  return [...cssPaths, ...nestedDependencies.flat()];
};

export const extractSemcoreImplicitDependencies = async (
  contents: string,
  path: string,
  resolver: EsbuildResolver,
): Promise<string[]> => {
  const lines = contents.split('\n');
  const reshadowDependencies = lines
    .filter((line) => line.startsWith('/*__reshadow-styles__:"') && line.endsWith('*/'))
    .map((line) => line.substring('/*__reshadow-styles__:"'.length, line.length - '"*/'.length));
  const semcoreVarsDependencies = lines
    .filter((line) => line.startsWith('/*__semcore-vars__:"') && line.endsWith('*/'))
    .map((line) => line.substring('/*__semcore-vars__:"'.length, line.length - '"*/'.length));
  const dirname = resolveDirname(path);
  const paths = [...reshadowDependencies, ...semcoreVarsDependencies].map((path) =>
    resolvePath(dirname, path),
  );

  const cssPaths = paths.filter((path) => path.endsWith('.css'));
  const nestedDependencies = await Promise.all(
    cssPaths.map((path) => extractCssDependencies(path, resolver)),
  );

  return [...paths, ...nestedDependencies.flat()];
};
