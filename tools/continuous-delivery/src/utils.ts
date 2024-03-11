import semver from 'semver';

const validateForBullshit = (version: string) => {
  if (version === '*') {
    throw new Error(
      `Asterisk versions is not currently supported for inner repo dependency. Got ${version}`,
    );
  }
  if (version.includes(' - ')) {
    throw new Error(
      `Range versions is not currently supported for inner repo dependency. Got ${version}`,
    );
  }
};

const extractPrefix = (version: string) => {
  let prefixEndIndex = 0;
  for (let i = 0; i < version.length; i++) {
    if (/\d/.test(version[i])) {
      prefixEndIndex = i;
      break;
    }
  }

  return version.substring(0, prefixEndIndex);
};

export const normalizeSemver = (version: string) => {
  validateForBullshit(version);
  const trimmed = version.trim();
  const prefix = extractPrefix(trimmed);
  let cut = trimmed.substring(prefix.length);

  if (cut.split('.').length < 3 && cut.includes('-')) {
    throw new Error('Unable to handle version with both missing minor/patch and prerelease');
  }

  while (cut.split('.').length < 3) {
    cut += '.0';
  }

  return cut;
};

export const carefulVersionUpdate = (oldVersion: string, newVersion: string) => {
  validateForBullshit(oldVersion);
  const prefix = extractPrefix(oldVersion);

  if (prefix) {
    return prefix + newVersion;
  }

  return newVersion;
};

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

export const formatMarkdown = (markdown: string) => {
  return (
    markdown
      .replace(/\n\*\s/g, '\n- ')
      .replace(/\*\*\s\s+/g, '** ')
      .replace(/ +/g, ' ')
      .replace(/ \n/g, '\n') + '\n'
  );
};

const start = Date.now();
export const log = (message: string) => {
  const secondsPassed = ((Date.now() - start) / 1000).toFixed(1);
  // biome-ignore lint/suspicious/noConsoleLog:
  console.log(`[${secondsPassed}s] ${message}`);
};
export const prerelaseSuffix = 'prerelease';
/**
 * Hardcoded but can be temporary incremented to handle broken versioning in
 * case of unsuccessful publish
 * @default 0
 */
export const prereleaseBaseIndex = 2;
