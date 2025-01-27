import type { Package } from './collectPackages';

export const syncCheck = async (packages: Package[]) => {
  const unsynchronizedPackages = packages.filter(
    ({ currentVersion, lastPublishedVersion, isPrivate }) =>
      !isPrivate && currentVersion !== lastPublishedVersion,
  );

  if (unsynchronizedPackages.length > 0) {
    // biome-ignore lint/suspicious/noConsoleLog:
    console.log('\n\n');

    for (const { name, currentVersion, lastPublishedVersion } of unsynchronizedPackages) {
      // biome-ignore lint/suspicious/noConsoleLog:
      console.log(`[${name}]: ${currentVersion} (in repo) ${lastPublishedVersion} (in npm)`);
    }
    // biome-ignore lint/suspicious/noConsoleLog:
    console.log('\n\n');
  }

  process.exit(unsynchronizedPackages.length > 0 ? 1 : 0);
};
