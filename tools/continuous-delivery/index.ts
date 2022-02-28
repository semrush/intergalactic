import { collectPackages } from './src/collectPackages';
import { makeVersionPatches } from './src/makeVersionPatches';
import { fetchVersionsFromNpm } from './src/fetchVersionsFromNpm';
import { updateVersions } from './src/updateVersions';
import { updateChangelogs } from './src/updateChangelogs';
import { runPublisher } from './src/runPublisher';
// import { runTests } from './src/runTests';
import { syncCheck } from './src/syncCheck';

const inNpmVersions = await fetchVersionsFromNpm();
const packages = await collectPackages(inNpmVersions);

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
