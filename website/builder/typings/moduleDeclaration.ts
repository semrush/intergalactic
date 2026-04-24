import ts from 'typescript';

import { serializeTypeDeclaration } from './typeAliases';

const MODULES_TO_SKIP = [
  'Intergalactic',
  'hoist-non-react-statics',
];

type Serialized = {
  filePath: string;
  dependencies: Array<string>;
  declaration: {
    name: string;
  };
};

type Tree = {
  [key: string]: {
    types?: Record<string, Serialized>;
    ns?: Tree;
  };
};

export function serializeModuleDeclaration(
  moduleDeclaration: ts.ModuleDeclaration,
  filePath: string,
  rootName?: string,
) {
  const { name: { text: moduleName }, body } = moduleDeclaration;

  if (MODULES_TO_SKIP.includes(moduleName)) return {};

  const tree: Tree = {
    [moduleName]: {},
  };

  if (!body) return tree;

  body.forEachChild((child) => {
    if (ts.isTypeAliasDeclaration(child)) {
      const { name: { text: childName } } = child;
      const name = rootName ? `${rootName}.${moduleName}.${childName}` : `${moduleName}.${childName}`;

      try {
        const { dependencies, ...declaration } = serializeTypeDeclaration(child);

        tree[moduleName] = {
          ...tree[moduleName],
          types: {
            ...tree[moduleName].types,
            [childName]: {
              filePath,
              dependencies: [...new Set(dependencies)],
              declaration: {
                ...declaration,
                name,
              },
            },
          },
        };
      } catch (err) {
        console.warn(`[typings.serializeModuleDeclaration]: can't serialize ${name}.`);
      }
    } else if (ts.isModuleDeclaration(child)) {
      tree[moduleName] = {
        ...tree[moduleName],
        ns: {
          ...tree[moduleName].ns,
          ...serializeModuleDeclaration(child, filePath, rootName ? `${rootName}.${moduleName}` : moduleName),
        },
      };
    }
  });

  return tree;
}
