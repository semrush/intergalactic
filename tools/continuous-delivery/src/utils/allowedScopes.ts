import fs from 'fs/promises';

export const allowedScopes = async () => {
  const filterFsEntries = (scopeName: string) =>
    !scopeName.startsWith('.') && !scopeName.startsWith('@');
  const semcoreComponents = (await fs.readdir('./semcore')).filter(filterFsEntries);
  const toolsComponents = (await fs.readdir('./tools')).filter(filterFsEntries);
  const specialScopes = ['global', 'chore', 'ci', 'website', 'docs', 'tests'];

  return {
    specialScopes,
    semcoreComponents,
    toolsComponents,
  };
};
