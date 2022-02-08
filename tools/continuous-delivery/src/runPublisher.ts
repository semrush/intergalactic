import { execSync } from 'child_process';
import { VersionPatch } from './makeVersionPatches';

export const runPublisher = async (versionPatches: VersionPatch[]) => {
  const byRoot: { [root: string]: VersionPatch[] } = {};

  for (const patch of versionPatches) {
    const pathParts = patch.package.path.split('/');
    const root = pathParts[pathParts.length - 2];
    byRoot[root] = byRoot[root] || [];
    byRoot[root].push(patch);
  }

  for (const root in byRoot) {
    const packageArg = byRoot[root]
      .map((patch) => {
        const [, name] = patch.package.name.split('/');
        return name.replace(/[^@\/\-\w_]/, '_');
      })
      .join(',');

    const args = `--no-check-git --release current --no-check-changelog --root ./${root} --package ${packageArg}`;

    // eslint-disable-next-line no-console
    console.log(`Running publisher with following args: ${args}`);

    execSync(`yarn pub ${args}`, {
      stdio: 'inherit',
    });
  }
};
