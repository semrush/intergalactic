import { Package } from './collectPackages';

export const syncCheck = async (packages: Package[]) => {
  const unsynchronizedPackages = packages.filter(
    ({ currentVersion, lastPublishedVersion, isPrivate }) =>
      !isPrivate && currentVersion !== lastPublishedVersion,
  );

  if (unsynchronizedPackages.length > 0) {
    // rome-ignore lint/nursery/noConsoleLog: <explanation>
    console.log('\n\n');

    for (const { name, currentVersion, lastPublishedVersion } of unsynchronizedPackages) {
      // rome-ignore lint/nursery/noConsoleLog: <explanation>
      console.log(`[${name}]: ${currentVersion} (in repo) ${lastPublishedVersion} (in npm)`);
    }
    // rome-ignore lint/nursery/noConsoleLog: <explanation>
    console.log('\n\n');
  }

  process.exit(unsynchronizedPackages.length > 0 ? 1 : 0);
};
