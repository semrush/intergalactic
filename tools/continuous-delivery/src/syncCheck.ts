import { Package } from './collectPackages';

export const syncCheck = async (packages: Package[]) => {
  const unsynchronizedPackages = packages.filter(
    ({ currentVersion, lastPublishedVersion, isPrivate }) =>
      !isPrivate && currentVersion !== lastPublishedVersion,
  );

  if (unsynchronizedPackages.length > 0) {
    console.log('\n\n');

    for (let { name, currentVersion, lastPublishedVersion } of unsynchronizedPackages) {
      console.log(`[${name}]: ${currentVersion} (in repo) ${lastPublishedVersion} (in npm)`);
    }

    console.log('\n\n');
  }

  process.exit(unsynchronizedPackages.length > 0 ? 1 : 0);
};
