import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.resolve(filename, '..', '..');

async function copyComponent(componentName: string, toCopy: string | string[]) {
    await fs.mkdir(path.resolve(dirname, 'libs', componentName), {recursive: true});

    const dirsToCopy = Array.isArray(toCopy) ? toCopy : [toCopy];

    await Promise.all(
        [
            ...dirsToCopy,
            'README.md',
        ].map(async (item) => {
            const from = path.resolve(dirname, '..', 'semcore', componentName, item);
            const to = path.resolve(dirname, 'libs', componentName, item);

            await fs.copy(from, to, {recursive: true});
        })
    );
}

async function copyIcon(name: string) {
    const iconsPath = path.resolve(dirname, '..', 'semcore', name);

    const isIconDir = (dir: string) => {
        const pathToIconDir = path.resolve(iconsPath, dir);

        return fs.statSync(pathToIconDir).isDirectory() &&
        !['__tests__', 'src', 'svg', 'node_modules'].includes(path.basename(dir));
    }

    const iconsDirs = await fs.readdir(iconsPath);
    const icons = iconsDirs.filter(isIconDir);

    await copyComponent(name, icons);
}

export async function copyLib(packages: string[]) {
    for (const dep of packages) {
        const [scope, name] = dep.split('/');

        if (scope !== '@semcore') {
            throw new Error(`Only @semcore score is available for now. You try to pass [${scope}]`);
        }

        switch (name) {
            case 'utils': {
                await copyComponent(name, ['lib', 'style']);
                break;
            }
            case 'icon': {
                await copyIcon(name);
                break;
            }
            case 'illustration': {
                await copyIcon(name);
                break
            }
            default: {
                await copyComponent(name, 'lib');
            }
        }
    }
}
