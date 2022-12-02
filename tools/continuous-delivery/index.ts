import { collectPackages } from './src/collectPackages';
import { makeVersionPatches } from './src/makeVersionPatches';
import { fetchFromNpm } from './src/fetchFromNpm';
import { updateVersions } from './src/updateVersions';
import { updateChangelogs } from './src/updateChangelogs';
import { runPublisher } from './src/runPublisher';
// import { runTests } from './src/runTests';
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
    await updateChangelogs(versionPatches);
    // await runTests();
    await runPublisher(versionPatches);
  }
};

export { fetchFromNpm };
