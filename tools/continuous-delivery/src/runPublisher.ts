import { execSync } from 'child_process';
import { VersionPatch } from './makeVersionPatches';

export const runPublisher = async (versionPatches: VersionPatch[]) => {
  const packageArg = versionPatches
    .map((patch) => {
      const [, name] = patch.package.name.split('/');
      return name.replace(/[^@\/\-\w_]/, '_');
    })
    .join(',');

  const args = `--no-check-git --release current --no-check-changelog --package ${packageArg}`;
  execSync(`yarn pub ${args}`, {
    stdio: 'inherit',
  });
};
