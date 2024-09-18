import * as fs from 'fs-extra';
import * as path from 'path';
import { js, jsx, ts, tsx } from '@ast-grep/napi';
import { log } from './logger';

type PathsToPatchImports = Record<string, number>;
const handledFiles = new Set<string>();

const intgDir = path.resolve(process.cwd(), 'node_modules', 'intergalactic');

export async function getDirectDependencies() {
  const packageData = await fs.readJSON(path.resolve(process.cwd(), 'package.json'), 'utf8');
  const dependencies = packageData.dependencies || [];
  const directImports = Object.keys(dependencies).filter((key) => {
    return key.startsWith('@semcore/') && !key.endsWith('/ui') && !key.includes('intergalactic');
  });

  return directImports;
}

async function checkFilesInDir(dir: string, pathsToPatchImports: PathsToPatchImports) {
  const items: string[] = await fs.readdir(dir);
  const components = Object.keys(fs.readJSONSync(path.resolve(intgDir, 'components.json')));

  await Promise.all(
    items.map(async (item) => {
      const resolvedPath = path.resolve(dir, item);
      const fsItem = fs.statSync(resolvedPath);

      if (fsItem.isDirectory()) {
        await checkFilesInDir(resolvedPath, pathsToPatchImports);
      } else {
        const source = fs.readFileSync(resolvedPath, 'utf8');

        let ast;

        if (item.endsWith('.ts')) {
          ast = ts.parse(source);
        } else if (item.endsWith('.tsx')) {
          ast = tsx.parse(source);
        } else if (item.endsWith('.js') || item.endsWith('.mjs')) {
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
            any: [
              {
                pattern: "import $A from '$SCOPE';",
              },
              {
                pattern: 'import $A from "$SCOPE";',
              },
            ],
          },
          constraints: {
            SCOPE: {
              regex: `@semcore/ui|${components.join('|')}`,
            },
          },
        });

        const nodesCJS = ast.root().findAll({
          rule: {
            any: [
              {
                pattern: 'require("$SCOPE")',
              },
              {
                pattern: "require('$SCOPE')",
              },
            ],
          },
          constraints: {
            SCOPE: {
              regex: `@semcore/ui|${components.join('|')}`,
            },
          },
        });

        // if (nodesES.length > 0) {
        pathsToPatchImports[resolvedPath] = nodesES.length;
        // }

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

export async function replaceImports(
  baseDir: string,
  originalPackageData: { main?: string },
): Promise<void> {
  const mainIsCJs = originalPackageData.main?.includes('/cjs/');
  const packageData = await fs.readJSON(path.resolve(intgDir, 'package.json'), 'utf8');
  const newName = packageData.name;
  const relativeRegexpEs = new RegExp(/from ['|"]\.\/([^.'"]*)()['|"];/g);
  const shallowRegexpES = new RegExp(/from ['|"]@semcore\/(ui\/){0,1}([^/\n]*)(?<!\/table)['|"];/g);
  const deepRegexpES = new RegExp(/from ['|"]@semcore\/(ui\/){0,1}(.*)(?<!\/table)['|"];/g);
  const regexpCJS = new RegExp(/require\(['|"]@semcore\/(ui\/){0,1}(.*)(?<!\/table)['|"]\)/g);

  const pathsToPatchImports: PathsToPatchImports = {};

  await checkFilesInDir(baseDir, pathsToPatchImports);

  await Promise.all(
    Object.entries(pathsToPatchImports).map(async ([pathToFile, count]) => {
      const newPathToFile =
        pathToFile.endsWith('.js') && !pathToFile.includes('/cjs/') && mainIsCJs
          ? pathToFile.replace(/\.js$/, '.mjs')
          : pathToFile;

      if (handledFiles.has(newPathToFile)) return;
      handledFiles.add(newPathToFile);

      const initialContent = await fs.readFile(pathToFile, 'utf8');

      const newContent = initialContent
        .replace(shallowRegexpES, `from '${newName}/$2/index.mjs';`)
        .replace(deepRegexpES, `from '${newName}/$2.mjs';`)
        .replace(regexpCJS, `require("${newName}/$2")`)
        .replace(relativeRegexpEs, `from './$1.mjs';`);

      if (newPathToFile !== pathToFile) {
        await Promise.all([fs.unlink(pathToFile), fs.writeFile(newPathToFile, newContent, 'utf8')]);
      } else {
        await fs.writeFile(pathToFile, newContent, 'utf8');
      }

      log(`  - Replaced ${count} old imports in: [${newPathToFile}].`);
    }),
  );
}
