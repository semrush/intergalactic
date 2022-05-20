import ts from 'typescript';
import { resolve as resolvePath, dirname as resolveDirname } from 'path';
import { readFile } from 'fs/promises';
import glob from 'fast-glob';
import { fileURLToPath } from 'url';
import { serializeInterfaceDeclaration } from './interfaces';
import { serializeTypeDeclaration } from './typeAliases';

const serializeFileDeclaration = (fileDeclaration: ts.SourceFile, filepath: string) => {
  const interfaceDec: ts.InterfaceDeclaration[] = [];
  const typesDec: ts.TypeAliasDeclaration[] = [];
  fileDeclaration.forEachChild((child) => {
    if (child.kind === ts.SyntaxKind.InterfaceDeclaration) {
      const isExported = child.modifiers?.some(
        (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
      );

      if (isExported) {
        interfaceDec.push(child as ts.InterfaceDeclaration);
      }
    }
    if (child.kind === ts.SyntaxKind.TypeAliasDeclaration) {
      const isExported = child.modifiers?.some(
        (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
      );

      if (isExported) {
        typesDec.push(child as ts.TypeAliasDeclaration);
      }
    }
  });

  const types = typesDec.map((type) => serializeTypeDeclaration(type));
  const interfaces = interfaceDec.map((int) => serializeInterfaceDeclaration(int));

  return {
    filepath,
    types,
    interfaces,
  };
};

export const resolveRepoTypings = async () => {
  const __dirname = resolveDirname(fileURLToPath(import.meta.url));
  const repoRoot = resolvePath(__dirname, '../../..');
  const files = await glob('semcore/*/src/**/*.ts(x)?', { cwd: repoRoot });
  const absolutePaths = files.map((file) => resolvePath(repoRoot, file));

  const sourceFiles = await Promise.all(
    absolutePaths.map(async (path) =>
      ts.createSourceFile(
        path.split('/').pop(),
        await readFile(path, 'utf8'),
        ts.ScriptTarget.Latest, // language version
      ),
    ),
  );

  const serialized = sourceFiles.map((file, index) =>
    serializeFileDeclaration(file, absolutePaths[index]),
  );
  const typings = {};
  for (const file of serialized) {
    for (const typing of [...file.types, ...file.interfaces]) {
      if (typings[typing.name]) {
        const duplicateFilepath = typings[typing.name].filepath;
        // eslint-disable-next-line no-console
        console.warn(
          `[typescript parser] ${typing.name} declaration found both in ${duplicateFilepath} and ${file.filepath} Using the declaration from the second path.`,
        );
      }
      const { dependencies, ...declaration } = typing;
      const uniqueDependencies = [...new Set(dependencies)];
      typings[typing.name] = {
        filepath: file.filepath,
        dependencies: uniqueDependencies,
        dependencyFiles: [],
        declaration,
      };
    }
  }
  for (const typing in typings) {
    const dependencies = typings[typing].dependencies;
    const dependencyFiles = dependencies
      .map((dependency) => typings[dependency]?.filepath)
      .filter(Boolean);
    typings[typing].dependencyFiles = dependencyFiles;
  }

  return typings;
};
