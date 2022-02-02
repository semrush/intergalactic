import { collectPackages } from './src/collectPackages';
import { makeVersionPatches } from './src/makeVersionPatches';
import { fetchVersionsFromNpm } from './src/fetchVersionsFromNpm';
import { updateVersions } from './src/updateVersions';
import { runPublisher } from './src/runPublisher';

const inNpmVersions = await fetchVersionsFromNpm();
const packages = await collectPackages(inNpmVersions);
const versionPatches = await makeVersionPatches(packages);

if (versionPatches.length > 0) {
  await updateVersions(versionPatches);
  await runPublisher(versionPatches);
}
