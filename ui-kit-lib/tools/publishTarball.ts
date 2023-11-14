import { log } from './logger';
import { resolve as resolvePath } from 'path';
import { execSync } from 'child_process';
import Git from 'simple-git';
import {fileURLToPath} from "url";
const git = Git();

const filename = fileURLToPath(import.meta.url);
const dirname = resolvePath(filename, '..', '..');

export const publishTarball = async (name: string, version: string) => {
    log('Republishing prereleased package...');

    const pnpmOptions = process.argv.includes('--dry-run')
        ? '--dry-run --no-git-checks'
        : '--no-git-checks';

    log(`pnpm options "${pnpmOptions}".`);

    log(`Publishing ${name}...`);
    execSync(`pnpm publish ${pnpmOptions}`, {
        cwd: dirname,
        encoding: 'utf-8',
        stdio: ['inherit', 'inherit', 'inherit'],
    });
    if (!process.argv.includes('--dry-run')) {
        await git.tag(['-f', `@${name}@${version}`]);
    }
    log(`Publishing of ${name} is finished.`);

    log('Prereleased packages were republished.');
};
