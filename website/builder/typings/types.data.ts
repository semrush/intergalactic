import ts from 'typescript';
import { resolve as resolvePath } from 'path';
import { readFile } from 'fs/promises';
import { serializeInterfaceDeclaration } from './interfaces';
import { serializeTypeDeclaration } from './typeAliases';
import { serializeClassDeclaration } from './classes';

const mapTypes = {
  ButtonProps: 'AbstractButtonProps',
  ButtonLinkProps: 'AbstractButtonProps',
};

const serializeFileDeclaration = (fileDeclaration: ts.SourceFile, filepath: string) => {
  const interfaceDec: ts.InterfaceDeclaration[] = [];
  const typesDec: ts.TypeAliasDeclaration[] = [];
  const classesDec: ts.ClassDeclaration[] = [];
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
    if (child.kind === ts.SyntaxKind.ClassDeclaration) {
      const isExported = child.modifiers?.some(
        (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
      );

      if (isExported) {
        classesDec.push(child as ts.ClassDeclaration);
      }
    }
  });

  const types = typesDec.map((type) => serializeTypeDeclaration(type));
  const interfaces = interfaceDec.map((int) => serializeInterfaceDeclaration(int));
  const classes = classesDec.map((cls) => serializeClassDeclaration(cls));

  return {
    filepath,
    types,
    interfaces,
    classes,
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
        for (const typing of [...file.types, ...file.interfaces, ...file.classes]) {
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
      for (const originalKey in mapTypes) {
        const mappedKey = mapTypes[originalKey];
        typings[originalKey] = typings[mappedKey];
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
