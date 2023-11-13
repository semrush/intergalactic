import { resolve as resolvePath } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import { toMarkdown } from 'marked-ast-markdown';
import { formatMarkdown } from '@semcore/continuous-delivery';
import { serializeReleaseChangelog, patchReleaseChangelog } from '@semcore/changelog-handler';

const filename = fileURLToPath(import.meta.url);
const releasePackageDir = resolvePath(filename, '..', '..');

export const updateReleaseChangelog = async (currentDependencies: Record<string, string>) => {
    const releasePackageFilePath = resolvePath(releasePackageDir, 'package.json');
    let releasePackageFile = await fs.readJson(releasePackageFilePath);

    const changelogPatch = await patchReleaseChangelog(
        releasePackageFile.version,
        currentDependencies,
        Object.keys(currentDependencies),
    );
    const { changelogs: patchedReleaseChangelog, version: newVersion } = changelogPatch;
    const changelogMarkdownAst = serializeReleaseChangelog(patchedReleaseChangelog);
    const changelogText = formatMarkdown(toMarkdown(changelogMarkdownAst));
    const changelogFilePath = resolvePath(releasePackageDir, 'CHANGELOG.md');
    await fs.writeFile(changelogFilePath, changelogText);
    releasePackageFile = await fs.readJson(releasePackageFilePath);
    releasePackageFile.version = newVersion;
    await fs.writeJson(releasePackageFilePath, releasePackageFile, { spaces: 2 });

    return changelogPatch;
};
