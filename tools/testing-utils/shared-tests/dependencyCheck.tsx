import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as process from 'node:process';

import glob from 'fast-glob';
import ts from 'typescript';
// eslint-disable-next-line no-restricted-imports
import { test, expect } from 'vitest';

function traverseImports(node: ts.Node, file: string, imports: Set<string>) {
  if (ts.isImportDeclaration(node)) {
    const modulePath = node.moduleSpecifier.getText().slice(1, -1);

    if (!modulePath.startsWith('@semcore') || modulePath.startsWith('@semcore/core')) {
      // console.debug(`Not semcore import "${modulePath}". Skip`);
      return;
    }

    if (node.importClause?.phaseModifier === ts.SyntaxKind.TypeKeyword) {
      // console.debug(`File: ${file}. ModulePath: ${modulePath}. TypeOnly: ${node.importClause.getText()}`);
      return;
    }

    const namedBindings = node.importClause?.namedBindings;
    if (namedBindings && ts.isNamedImportBindings(namedBindings)) {
      const elements = node.importClause.namedBindings.getChildren();
      const isAllTypes = elements.length > 0 && elements.every((node) => {
        return ts.isImportSpecifier(node) && node.isTypeOnly;
      });

      if (isAllTypes) {
        // console.debug(`File: ${file}. ModulePath: ${modulePath}. TypeOnly: ${node.importClause.getText()}`);
        return;
      }
    }

    const semcorePackage = modulePath.split('/').slice(0, 2).join('/');
    imports.add(semcorePackage);
  } else {
    ts.forEachChild(node, (childNode) => traverseImports(childNode, file, imports));
  }
}

async function extractImports(filePath: string, imports: Set<string>) {
  const content = await fs.readFile(filePath, 'utf8');
  const ast = ts.createSourceFile('tmp', content, ts.ScriptTarget.Latest, true);

  traverseImports(ast, filePath, imports);
}

export function runDependencyCheckTests(component: string) {
  test(`All @semcore dependencies are imported in: "${component}"`, async () => {
    const pathToComponent = path.join(process.cwd(), 'semcore', component);
    const packageRawData = await fs.readFile(path.join(pathToComponent, 'package.json'), 'utf8');
    const packageData = JSON.parse(packageRawData);
    const definedDependencies = new Set([
      ...Object.keys(packageData.dependencies ?? {}),
      ...Object.keys(packageData.peerDependencies ?? {}),
    ]);
    const srcFiles = await glob(`${pathToComponent}/src/**/*.+(js|jsx|ts|tsx)`);
    const allImports = new Set<string>();

    await Promise.all(
      srcFiles.map(async (filePath) => {
        await extractImports(filePath, allImports);
      }),
    );

    allImports.forEach((importedDep) => {
      const isDepImported = definedDependencies.has(importedDep);
      expect(`${importedDep}: ${isDepImported}`).toBe(`${importedDep}: ${true}`);
    });
  });
}
