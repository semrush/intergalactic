import glob from 'fast-glob';
import ts from 'typescript';
import { resolve, dirname } from 'path';
import { readFileSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';

class SourceMapper {
  private importsMap = new Map<string, string>();
  private readonly ast: ts.SourceFile;
  private readonly filePath: string;

  constructor(sourceCode: string, filePath: string) {
    const ast = ts.createSourceFile('tmp', sourceCode, ts.ScriptTarget.Latest, true);

    this.ast = ast;
    this.filePath = filePath;
  }

  public makeSources() {
    this.traverseImports(this.ast, this.filePath);

    this.traverse(this.ast);
  }

  public getCodeWithSources() {
    const statements = this.ast.statements;
    const newAst = ts.factory.updateSourceFile(this.ast, statements);
    const result = ts.createPrinter().printFile(newAst);

    return result;
  }

  private traverse(node: ts.Node) {
    if (node.kind === ts.SyntaxKind.FirstStatement) {
      node.forEachChild((childNode) => {
        if (ts.isVariableDeclarationList(childNode)) {
          childNode.declarations.forEach((declaration) => {
            if (
              ts.isVariableDeclaration(declaration) &&
              declaration.type?.kind === ts.SyntaxKind.TypeReference &&
              (declaration.type.getText() === 'Story' ||
                declaration.type.getText() === 'StoryObj') &&
              declaration.initializer &&
              ts.isObjectLiteralExpression(declaration.initializer)
            ) {
              const render = declaration.initializer.properties.find(
                (node) => ts.isPropertyAssignment(node) && node.name.getText() === 'render',
              );

              if (
                render &&
                ts.isPropertyAssignment(render) &&
                render.initializer &&
                ts.isIdentifier(render.initializer)
              ) {
                const importName = render.initializer.getText();

                if (this.importsMap.has(importName)) {
                  const path = `${this.importsMap.get(importName)}.tsx`;
                  const fileContent = readFileSync(path, 'utf8');

                  const codeProperty = ts.factory.createPropertyAssignment(
                    ts.factory.createIdentifier('sourceCode'),
                    ts.factory.createStringLiteral(fileContent),
                  );

                  const parametersObject = ts.factory.createObjectLiteralExpression([codeProperty]);

                  const parameters = ts.factory.createPropertyAssignment(
                    ts.factory.createIdentifier('parameters'),
                    parametersObject,
                  );

                  declaration.initializer.properties.push(parameters);
                }
              }
            }
          });
        }
      });
    } else {
      ts.forEachChild(node, (childNode) => this.traverse(childNode));
    }
  }

  private traverseImports(node: ts.Node, file: string) {
    if (ts.isImportDeclaration(node)) {
      if (
        node.moduleSpecifier.getText().includes('./examples') &&
        node.importClause &&
        node.importClause.name
      ) {
        const importValue = node.moduleSpecifier.getText().replace(/'|"/g, '');
        const importPaths = importValue.split('/').slice(1);
        const resolvedPath = resolve(dirname(file), ...importPaths);
        this.importsMap.set(node.importClause.name.getText(), resolvedPath);
      }
    } else {
      ts.forEachChild(node, (childNode) => this.traverseImports(childNode, file));
    }
  }
}

async function run() {
  const files = await glob('./stories/**/*.stories.@(ts|tsx)');

  // biome-ignore lint/suspicious/noConsoleLog:
  console.log('files to patch: ', files);

  for (const file of files) {
    const sourceCode = await readFile(file, 'utf-8');

    const sourceMap = new SourceMapper(sourceCode, file);

    sourceMap.makeSources();
    const codeWithSources = sourceMap.getCodeWithSources();

    await writeFile(file, codeWithSources, 'utf-8');
  }
}

run().catch(console.error);
