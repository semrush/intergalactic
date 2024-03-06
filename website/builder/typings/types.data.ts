import ts from 'typescript';
import { resolve as resolvePath } from 'path';
import { readFile } from 'fs/promises';
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

export default {
  watch: [
    resolvePath(__dirname, '../../../semcore/**/*.d.ts'),
    resolvePath(__dirname, '../../../semcore/**/*.ts'),
    resolvePath(__dirname, '../../../semcore/**/*.tsx'),
  ],
  async load(watchedFiles) {
    watchedFiles = watchedFiles.filter((path) => !path.includes('/lib/'));
    const sourceFiles = await Promise.all(
      watchedFiles.map(async (path) =>
        ts.createSourceFile(
          path.split('/').pop(),
          await (readFile(path, 'utf-8') as any as string),
          ts.ScriptTarget.Latest, // language version
        ),
      ),
    );

    try {
      const serialized = sourceFiles.map((file, index) =>
        serializeFileDeclaration(file, watchedFiles[index]),
      );
      const typings = {};
      for (const file of serialized) {
        for (const typing of [...file.types, ...file.interfaces]) {
          if (typings[typing.name]) {
            const duplicateFilepath = typings[typing.name].filepath;

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
    } catch (err) {
      // biome-ignore lint/suspicious/noConsoleLog:
      console.log(String(err).substring(0, 1000));
      // biome-ignore lint/suspicious/noConsoleLog:
      console.log('Failed to serialize typings');
      return {};
    }
  },
};
