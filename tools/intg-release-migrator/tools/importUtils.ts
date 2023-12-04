import {
  readJSON,
  readdir,
  readJSONSync,
  statSync,
  readFileSync,
  readFile,
  writeFile,
} from 'fs-extra';
import { resolve } from 'path';
import { js, jsx, ts, tsx } from '@ast-grep/napi';

type PathsToPatchImports = Record<string, number>;

const intgDir = resolve(process.cwd(), 'node_modules', 'intg');

export async function getDirectDependencies() {
  const packageData = await readJSON(resolve(process.cwd(), 'package.json'), 'utf8');
  const dependencies = packageData.dependencies || [];
  const directImports = Object.keys(dependencies).filter((key) => {
    return (
      key.startsWith('@semcore/') && !key.endsWith('/ui') && !key.endsWith('new-release-migrator')
    );
  });

  return directImports;
}

async function checkFilesInDir(dir: string, pathsToPatchImports: PathsToPatchImports) {
  const items: string[] = await readdir(dir);
  const components = Object.keys(readJSONSync(resolve(intgDir, 'components.json')));

  await Promise.all(
    items.map(async (item) => {
      const resolvedPath = resolve(dir, item);
      const fsItem = statSync(resolvedPath);

      if (fsItem.isDirectory()) {
        await checkFilesInDir(resolvedPath, pathsToPatchImports);
      } else {
        const source = readFileSync(resolvedPath, 'utf8');

        let ast;

        if (item.endsWith('.ts')) {
          ast = ts.parse(source);
        } else if (item.endsWith('.tsx')) {
          ast = tsx.parse(source);
        } else if (item.endsWith('.js')) {
          ast = js.parse(source);
        } else if (item.endsWith('.jsx')) {
          ast = jsx.parse(source);
        }

        if (!ast) {
          return;
        }

        const nodesES = ast.root().findAll({
          rule: {
            kind: 'import_statement',
            pattern: "import $A from '$SCOPE';",
          },
          constraints: {
            SCOPE: {
              regex: `@semcore/ui|${components.join('|')}`,
            },
          },
        });

        const nodesCJS = ast.root().findAll({
          rule: {
            pattern: 'require("$SCOPE")',
          },
          constraints: {
            SCOPE: {
              regex: `@semcore/ui|${components.join('|')}`,
            },
          },
        });

        if (nodesES.length > 0) {
          pathsToPatchImports[resolvedPath] = nodesES.length;
        }

        if (nodesCJS.length > 0) {
          pathsToPatchImports[resolvedPath] = pathsToPatchImports[resolvedPath]
            ? pathsToPatchImports[resolvedPath] + nodesCJS.length
            : nodesCJS.length;
        }
      }
    }),
  );
}

export async function getImportPaths(baseDir: string): Promise<PathsToPatchImports> {
  const pathsToPatchImports: PathsToPatchImports = {};

  await checkFilesInDir(baseDir, pathsToPatchImports);

  return pathsToPatchImports;
}

export async function replaceImports(baseDir: string): Promise<void> {
  const packageData = await readJSON(resolve(intgDir, 'package.json'), 'utf8');
  const newName = packageData.name;
  const regexpES = new RegExp(/from ['|"]@semcore\/(ui\/){0,1}(.*)['|"];/g);
  const regexpCJS = new RegExp(/require\(['|"]@semcore\/(ui\/){0,1}(.*)['|"]\)/g);

  const pathsToPatchImports: PathsToPatchImports = {};

  await checkFilesInDir(baseDir, pathsToPatchImports);

  await Promise.all(
    Object.keys(pathsToPatchImports).map(async (pathToFile) => {
      const scriptData = await readFile(pathToFile, 'utf8');

      const dataToWrite = scriptData
        .replace(regexpES, `from '${newName}/libs/$2';`)
        .replace(regexpCJS, `require("${newName}/libs/$2")`);

      await writeFile(pathToFile, dataToWrite, 'utf8');
    }),
  );
}
