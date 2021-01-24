const { get } = require('axios');
const { satisfies, diff, coerce, parse } = require('semver');

const packagesRequire = require('require-all')({
  dirname: __dirname + '/../../semcore',
  filter: /package\.json$/,
});

const packages = Object.keys(packagesRequire).map((name) => packagesRequire[name]['package.json']);

const registryUrl = 'https://registry.npmjs.org/';

async function fetchNpm(packageName) {
  try {
    const { data } = await get(registryUrl + packageName);
    return data;
  } catch (e) {
    console.error(`${packageName}: ${e.message}`);
  }
}

function isValidRange(current, published) {
  return published.map((version) => satisfies(version, current)).includes(true);
}

let count = 0;
console.time('process');
packages
  .map((pac) => async () => {
    const depCheck = (await Promise.all(
      Object.keys(pac.dependencies).map(async (name) => {
        const selfVersion = pac.dependencies[name];
        const depNpm = await fetchNpm(name);
        const isValid = isValidRange(selfVersion, Object.keys(depNpm.versions));
        if (isValid) {
          const diffRelease = diff(depNpm['dist-tags'].latest, coerce(selfVersion));
          if (diffRelease === null || diffRelease === 'patch' || diffRelease === 'prepatch') {
            // console.info(`[${name}] has valid range.`);
          } else {
            const parseVersion = parse(depNpm['dist-tags'].latest);
            return [name, selfVersion, `^${parseVersion.major}.${parseVersion.minor}`];
          }
        } else {
          return [name, selfVersion, `HAS NO PUBLISHED VERSIONS TO SATISFY`];
        }
        return [];
      }),
    )).filter((dep) => dep.length);

    if (depCheck.length) {
      count++;
      console.group(count, pac.name);
      console.table(
        depCheck.map((dep) => {
          return {
            name: dep[0],
            current: dep[1],
            next: dep[2],
          };
        }),
      );
      console.groupEnd();
    }
  })
  .reduce((p, fn) => p.then(fn), Promise.resolve())
  .then(() => console.timeEnd('process'));
