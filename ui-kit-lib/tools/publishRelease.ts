import {copyLib} from './copyLibs';
import {updateReleaseChangelog} from './updateReleaseChangelog';
import {updateComponentsVersions} from './updateComponentsVersions';
import {publishReleaseNotes} from '@semcore/continuous-delivery';
import {fileURLToPath} from 'url';
import path from 'path';
import fs from 'fs-extra';
import {log} from "./logger";
import {commitPatch} from "./commitPatch";
import {publishTarball} from "./publishTarball";

const filename = fileURLToPath(import.meta.url);
const dirname = path.resolve(filename, '..', '..');

const publishRelease = async () => {

    if (!process.argv.includes('--dry-run')) {
        throw new Error('on test use dry-run');
    }

    const deps = fs.readJSONSync(path.resolve(dirname, 'components.json'));
    const packages = Object.keys(deps);

    log('Copy libs');
    await copyLib(packages);
    log('Update Release Changelog');
    const changelogPatch = await updateReleaseChangelog(deps);
    log('Update components versions');
    await updateComponentsVersions(packages);
    log('Publish');
    await publishTarball('intergalactic', changelogPatch.version);

    if (!process.argv.includes('--dry-run')) {
        await commitPatch();
    }
    if (!process.argv.includes('--dry-run')) {
        await publishReleaseNotes(changelogPatch.version, changelogPatch.changelogs.slice(0, 1));
    }

};

export {
    publishRelease,
};
