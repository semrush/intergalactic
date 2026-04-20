import fs from 'fs/promises';
import { resolve as resolvePath } from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = resolvePath(fileURLToPath(import.meta.url), '..');

export const allowedScopes = async () => {
  const filterFsEntries = (scopeName: string) =>
    !scopeName.startsWith('.') && !scopeName.startsWith('@') && !scopeName.startsWith('base-components');
  const semcoreComponents = (await fs.readdir(resolvePath(dirname, '..', '..', '..', '..', 'semcore'))).filter(filterFsEntries);
  const semcoreBaseComponents = (await fs.readdir(resolvePath(dirname, '..', '..', '..', '..', 'semcore', 'base-components', 'src', 'components'))).filter(filterFsEntries);
  const toolsComponents = (await fs.readdir(resolvePath(dirname, '..', '..', '..', '..', 'tools'))).filter(filterFsEntries);
  const specialScopes = ['global', 'chore', 'ci', 'website', 'docs', 'tests', 'stories', 'figma'];

  return {
    specialScopes,
    semcoreComponents,
    semcoreBaseComponents,
    toolsComponents,
  };
};
