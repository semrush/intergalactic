import path from "path";
import fs from 'fs-extra';
import {fileURLToPath} from "url";
import {updateReleaseChangelog} from "@semcore/changelog-handler";

const filename = fileURLToPath(import.meta.url);
const dirname = path.resolve(filename, '..', '..');
const deps = fs.readJSONSync(path.resolve(dirname, 'components.json'));
const packages = Object.keys(deps);

function updateVersions() {
    const newDeps: Record<string, string> = {};

    packages.forEach((pack) => {
        const [scope, name] = pack.split('/');
        const from = path.resolve(dirname, '..', '..', 'semcore', name, 'package.json');
        const { version } = fs.readJSONSync(from);

        newDeps[pack] = version;
    });

    fs.writeJSONSync(path.resolve(dirname, 'components.json'), newDeps, { spaces: 2 });
}

console.log('  Update CHANGELOG');
await updateReleaseChangelog();
console.log('  Update versions');
updateVersions();