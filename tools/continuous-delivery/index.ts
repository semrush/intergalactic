import { collectPackages } from './src/collectPackages';
import { makeVersionPatches } from './src/makeVersionPatches';
import { fetchFromNpm } from './src/fetchFromNpm';
import { updateVersions } from './src/updateVersions';
import { updateChangelogs } from './src/updateChangelogs';
import { runPublisher } from './src/runPublisher';
import { syncCheck } from './src/syncCheck';

export const runContinuousDelivery = async () => {
  const inNpmData = await fetchFromNpm();
  const packages = await collectPackages(inNpmData);

  if (process.argv.includes('--check')) {
    await syncCheck(packages);
    process.exit();
  }

  const versionPatches = await makeVersionPatches(packages);

  if (versionPatches.length > 0) {
    await updateVersions(versionPatches);
    await updateChangelogs(versionPatches.filter((patch) => patch.package.name !== '@semcore/ui'));
    await runPublisher(versionPatches);
  }
};

export { fetchFromNpm };
