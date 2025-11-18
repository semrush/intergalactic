import fs from 'fs/promises';
import { resolve as resolvePath } from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = resolvePath(fileURLToPath(import.meta.url), '..');

export const allowedScopes = async () => {
  const filterFsEntries = (scopeName: string) =>
    !scopeName.startsWith('.') && !scopeName.startsWith('@');
  const semcoreComponents = (await fs.readdir(resolvePath(dirname, '..', '..', '..', '..', 'semcore'))).filter(filterFsEntries);
  const toolsComponents = (await fs.readdir(resolvePath(dirname, '..', '..', '..', '..', 'tools'))).filter(filterFsEntries);
  const specialScopes = ['global', 'chore', 'ci', 'website', 'docs', 'tests', 'stories'];

  return {
    specialScopes,
    semcoreComponents,
    toolsComponents,
  };
};
