import fs from 'fs-extra';
import path from 'path';
import {js, jsx, ts, tsx} from "@ast-grep/napi";

type PathsToPatchImports = Record<string, number>;

export async function getDirectDependencies() {
    const packageData = await fs.readJSON(path.resolve(process.cwd(), 'package.json'), 'utf8');
    const dependencies = packageData.dependencies;
    const directImports = Object.keys(dependencies).filter((key) => {
        return key.startsWith('@semcore/') && !key.endsWith('/ui');
    });

    return directImports;
}

async function checkFilesInDir(dir: string, pathsToPatchImports: PathsToPatchImports) {
    const items: string[] = await fs.readdir(dir);

    await Promise.all(items.map(async (item) => {
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
            } else if (item.endsWith('.js')) {
                ast = js.parse(source);
            } else if (item.endsWith('.jsx')) {
                ast = jsx.parse(source);
            }

            if (!ast) {
                return;
            }

            const nodes = ast.root().findAll({
                rule: {
                    kind: 'import_statement',
                    pattern: "import $A from '$SCOPE';"
                },
                constraints: {
                    'SCOPE': {
                        regex: '@semcore|@semcore/ui'
                    }
                }
            });

            if (nodes.length > 0) {
                pathsToPatchImports[resolvedPath] = nodes.length;
            }
        }
    }));
}

export async function getImportPaths(baseDir: string = 'src'): Promise<PathsToPatchImports> {
    const pathsToPatchImports: PathsToPatchImports = {};

    await checkFilesInDir(baseDir, pathsToPatchImports);

    return pathsToPatchImports;
}

export async function replaceImports(baseDir: string = 'src'): Promise<void> {
    const newName = 'intergalactic';
    const regexp = new RegExp(/from '@semcore\/(ui\/){0,1}(.*)';/g);

    const pathsToPatchImports: PathsToPatchImports = {};

    await checkFilesInDir(baseDir, pathsToPatchImports);

    await Promise.all(Object.keys(pathsToPatchImports).map(async (pathToFile) => {
        const scriptData = await fs.readFile(pathToFile, 'utf8');

        const dataToWrite = scriptData.replaceAll(regexp, `from '${newName}/$2';`);

        await fs.writeFile(pathToFile, dataToWrite, 'utf8');
    }));
}