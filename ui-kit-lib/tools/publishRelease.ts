import {publishReleaseNotes} from "@semcore/continuous-delivery/src/publishReleaseNotes";
import {copyLib} from './copyLibs';
import {updateReleaseChangelog} from './updateReleaseChangelog';
import {updateComponentsVersions} from './updateComponentsVersions';
import {republishTarballs} from '@semcore/continuous-delivery/src/republishTarballs';
import {fileURLToPath} from 'url';
import path from 'path';
import fs from 'fs-extra';
import {log} from "./logger";
import {commitPatch} from "./commitPatch";

const filename = fileURLToPath(import.meta.url);
const dirname = path.resolve(filename, '..', '..');

const publishRelease = async () => {
    const deps = fs.readJSONSync(path.resolve(dirname, 'components.json'));
    const packages = Object.keys(deps);
    const packagesPaths = packages.map((name) => path.resolve(dirname, '..', 'semcore', name));

    console.log(process.argv.includes('--dry-run'));

    log('Copy libs');
    await copyLib(packages);
    log('Update Release Changelog');
    const changelogPatch = await updateReleaseChangelog(deps);
    log('Update components versions');
    await updateComponentsVersions(packages);
    log('Publish');
    await republishTarballs(packagesPaths);

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
