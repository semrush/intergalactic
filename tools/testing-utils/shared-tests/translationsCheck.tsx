import { execFile } from 'node:child_process';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { promisify } from 'node:util';

import ts from 'typescript';
// eslint-disable-next-line no-restricted-imports
import { test, expect } from 'vitest';

const execFileAsync = promisify(execFile);

export function runTranslationsCheckTest(pckg: string, innerFolder?: string) {
  test(`All translations are exported from "${pckg}" ${innerFolder ? `> ${innerFolder}` : ''}`, async () => {
    let translationsPath = null;

    const { stdout: packageInfo } = await execFileAsync('pnpm', ['list', '--json', '--filter', pckg], {
      encoding: 'utf-8',
    });
    const packagePath = JSON.parse(packageInfo)[0]?.path;

    if (packagePath) {
      translationsPath = path.join(packagePath, 'src', innerFolder ?? '', 'translations');
    }

    if (translationsPath === null) {
      throw new Error('Unable to find package root path.');
    }

    const files = await fs.readdir(translationsPath, { withFileTypes: true });

    const [indexFile, jsonFiles] = files.reduce<[string | null, string[]]>((acc, entry) => {
      if (!entry.isFile()) {
        return acc;
      }
      const [index, JSONs] = acc;

      const fileName = entry.name;
      const isJSON = fileName.endsWith('.json');
      const isIndex = fileName === '__intergalactic-dynamic-locales.ts';

      if (isIndex) {
        return [fileName, [...JSONs]];
      }

      if (isJSON) {
        return [index, [...JSONs, fileName]];
      }

      return acc;
    }, [null, []]);

    if (indexFile === null) {
      throw new Error(`Unable to find __intergalactic-dynamic-locales.ts in ${translationsPath}`);
    }

    const content = await fs.readFile(path.join(translationsPath, indexFile), 'utf-8');
    const { imports, exported } = parseLocalesFile(content);

    jsonFiles.forEach((jsonFile) => {
      const locale = path.basename(jsonFile, '.json');
      const importedAs = [...imports].find(([, modulePath]) => modulePath === `./${jsonFile}`)?.[0];

      expect(`${jsonFile} imported: ${Boolean(importedAs)}`).toBe(`${jsonFile} imported: true`);
      expect(`${locale} exported as: ${exported.get(locale)}`).toBe(`${locale} exported as: ${importedAs}`);
    });

    expect([...exported.keys()].sort()).toEqual(jsonFiles.map((file) => path.basename(file, '.json')).sort());
  });
}

function parseLocalesFile(content: string) {
  const ast = ts.createSourceFile('tmp.ts', content, ts.ScriptTarget.Latest, true);
  const imports = new Map<string, string>();
  const exported = new Map<string, string>();

  ast.statements.forEach((statement) => {
    if (ts.isImportDeclaration(statement)) {
      const name = statement.importClause?.name?.text;
      if (name && ts.isStringLiteral(statement.moduleSpecifier)) {
        imports.set(name, statement.moduleSpecifier.text);
      }
      return;
    }

    if (ts.isVariableStatement(statement)) {
      statement.declarationList.declarations.forEach((declaration) => {
        if (
          !ts.isIdentifier(declaration.name) ||
          declaration.name.text !== 'localizedMessages' ||
          !declaration.initializer ||
          !ts.isObjectLiteralExpression(declaration.initializer)
        ) {
          return;
        }

        declaration.initializer.properties.forEach((property) => {
          if (ts.isShorthandPropertyAssignment(property)) {
            exported.set(property.name.text, property.name.text);
          } else if (ts.isPropertyAssignment(property) && ts.isIdentifier(property.initializer)) {
            exported.set(property.name.getText().replace(/['"]/g, ''), property.initializer.text);
          }
        });
      });
    }
  });

  return { imports, exported };
}
