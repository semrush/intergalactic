import Git from 'simple-git';
import { log } from './logger';

const git = Git();

export const commitPatch = async () => {
    log('Rebasing on git origin...');
    try {
        await git.pull('origin', 'master', { '--rebase': 'true' });
    } catch (err) {
        // biome-ignore lint/suspicious/noConsoleLog:
        console.log(await git.status());
        throw err;
    }
    log('Rebased on git origin.');
    log('Pushing to git origin...');
    await git.push('origin', 'master', { '--follow-tags': null });
    log('Pushed to git origin.');
};
