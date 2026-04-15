import { readFile } from 'fs/promises';
import { resolve as resolvePath } from 'path';

import ts from 'typescript';

import { serializeClassDeclaration } from './classes';
import { serializeInterfaceDeclaration } from './interfaces';
import { serializeTypeDeclaration } from './typeAliases';

function buildNSRegistry(ns: ts.ModuleDeclaration, rootName?: string) {
  const { name: { text: nsName }, body } = ns;

  let registry: Record<string, ts.TypeAliasDeclaration> = {};

  if (!body) return registry;

  body.forEachChild((child) => {
    if (ts.isTypeAliasDeclaration(child)) {
      const { name: { text: childKey } } = child;

      const key = rootName ? `${rootName}.${nsName}.${childKey}` : `${nsName}.${childKey}`;

      registry[key] = child;
    } else if (ts.isModuleDeclaration(child)) {
      const key = rootName ? `${rootName}.${nsName}` : nsName;

      registry = {
        ...registry,
        ...buildNSRegistry(child, key),
      };
    }
  });

  return registry;
}

const serializeFileDeclaration = (fileDeclaration: ts.SourceFile, filepath: string) => {
  const interfaceDec: ts.InterfaceDeclaration[] = [];
  const typesDec: ts.TypeAliasDeclaration[] = [];
  const classesDec: ts.ClassDeclaration[] = [];

  let nsRegistry: Record<string, ts.TypeAliasDeclaration> = {};

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

    if (ts.isModuleDeclaration(child)) {
      nsRegistry = {
        ...nsRegistry,
        ...buildNSRegistry(child),
      };
    }
  });

  const types = typesDec.map((type) => serializeTypeDeclaration(type, nsRegistry));
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
    resolvePath(__dirname, '../../../semcore/*/src/**/*.d.ts'),
    resolvePath(__dirname, '../../../semcore/*/src/**/*.ts'),
    resolvePath(__dirname, '../../../semcore/*/src/**/*.tsx'),
  ],
  async load(watchedFiles) {
    watchedFiles = watchedFiles.filter((path) => !path.includes('/lib/') && !path.includes('/__tests__/'));
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

          if ('type' in declaration && declaration.type.length > 0) {
            if (typeof declaration.type[0] === 'string' && declaration.type[0]?.includes('keyof') && declaration.type[1]?.referenceTo) {
              if (declaration.type[2]?.includes('as `')) {
                let nestedType: undefined | typeof serialized[number]['types'][number];

                for (const s of serialized) {
                  for (const sType of s.types) {
                    if (sType.name === declaration.type[1].referenceTo) {
                      nestedType = sType;
                      break;
                    }
                  }

                  if (nestedType) {
                    break;
                  }
                }

                if (nestedType && nestedType.properties) {
                  const prefix = declaration.type[2].match(/as `(\w+):/);

                  declaration.type.push({
                    properties: nestedType.properties.map((prop: any) => {
                      return {
                        ...prop,
                        name: `${prefix[1]}:${prop.name}`,
                      };
                    }),
                  });
                }
                if (nestedType && nestedType.type) {
                  declaration.type.push(nestedType.type);
                }
              }
            }
          }

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
      console.log(String(err).substring(0, 1000));

      console.log('Failed to serialize typings');
      return {};
    }
  },
};
