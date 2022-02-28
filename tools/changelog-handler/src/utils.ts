import semver from 'semver';

export const isValidSemver = (version: string) => {
  if (version === '*') return true;

  let cleaned = String(version).trim();
  if (cleaned.startsWith('~')) {
    cleaned = cleaned.substring(1);
  } else if (cleaned.startsWith('^')) {
    cleaned = cleaned.substring(1);
  }

  return semver.valid(semver.coerce(cleaned.trim()));
};
