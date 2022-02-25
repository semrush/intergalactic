const { execSync } = require('child_process');
const path = require('path');
const fse = require('fs-extra');
const glob = require('glob');
// eslint-disable-next-line import/no-extraneous-dependencies
const changeLogsByDate = require('@semcore/changelogs-by-date');
const pkg = require('./package');
const components = require('./components');

const REGISTRY_URL = 'https://registry.npmjs.org/';
const CHANGELOG_ORDER = ['break', 'added', 'fixed', 'changed'];
const EXPORT_DEFAULT_REG = /export ({ default }|default)/gm;

const typeByChangeLog = {
  break: 'BREAK',
  added: 'Added',
  fixed: 'Fixed',
  changed: 'Changed',
};

const hasUppercase = (str) => str.toLowerCase() !== str;

async function removeDirectory() {
  const toRemove = [...glob.sync('!(*.*|__tests__)'), 'yarn.lock'];
  try {
    execSync(`rm -R ${toRemove.join(' ')}`, {
      stdio: 'inherit',
      cwd: __dirname,
    });
  } catch (e) {}
}

async function installComponents(packages) {
  execSync(`npm_config_registry=${REGISTRY_URL} yarn add ${packages.join(' ')} -E`, {
    stdio: 'inherit',
    cwd: __dirname,
  });

  const node_modules = execSync('find ./node_modules/@semcore -name "node_modules" -type d', {
    cwd: __dirname,
  }).toString();
  if (node_modules) throw new Error(`DUPLICATES FOUND ${node_modules}`);
}

function hasExportDefault(dependency) {
  try {
    const resolved = require(dependency);
    return Object.hasOwnProperty.call(resolved, 'default');
  } catch (e) {
    // fallback resolver
    const dependencyPkgJson = require.resolve(dependency + '/package.json');
    const { module } = fse.readJsonSync(dependencyPkgJson);

    if (!module) return true;

    const dependencyES6EntryPath = require.resolve(dependency + `/${module}`);
    const ES6EntryContent = fse.readFileSync(dependencyES6EntryPath, 'utf8');
    return ES6EntryContent.match(EXPORT_DEFAULT_REG) !== null;
  }
}

const EXPORT_TEMPLATES = {
  LIB_DEFAULT: (lib, component) =>
    `export { default } from '${lib}/lib/${component}';\nexport * from '${lib}/lib/${component}';`,
  LIB_NAMED: (lib, component) => `export * from '${lib}/lib/${component}';`,
  DEFAULT: (lib) => `export { default } from '${lib}';\nexport * from '${lib}';`,
  NAMED: (lib) => `export * from '${lib}';`,
};

const GENERATOR = {
  UTILS: (dependency, name) => {
    const utilsMain = require.resolve(dependency);
    const utilsPath = path.join(utilsMain, '..');
    const utils = glob.sync('**/*.+(js|ts)', { cwd: utilsPath });
    utils.map((util) => {
      const utilsModule = `${utilsPath}/${util.replace('.d.ts', '.js')}`;

      // index.js of utils throws & useless, so we copy it
      if (util.replace('.d.ts', '.js') === 'index.js') {
        fse.copySync(`${utilsPath}/${util}`, `./${name}/lib/${util}`);
        return;
      }

      const TEMPLATE = hasExportDefault(utilsModule)
        ? EXPORT_TEMPLATES.LIB_DEFAULT
        : EXPORT_TEMPLATES.LIB_NAMED;
      fse.outputFileSync(
        `./${name}/lib/${util}`,
        TEMPLATE(dependency, util.replace('.d.ts', '').replace('.js', '')),
      );
    });
  },
  ICONS: (dependency, name) => {
    const iconPath = require.resolve(dependency);

    const oldIconsDir = path.join(iconPath, '../..');
    const newIconsDir = path.join(iconPath, '../../..');

    const isIconDir = (dir) =>
      fse.statSync(dir).isDirectory() &&
      !['__tests__', 'src', 'svg', 'svg-new', 'node_modules'].includes(path.basename(dir));
    const oldIcons = fse
      .readdirSync(oldIconsDir)
      .filter((iconDir) => isIconDir(path.join(oldIconsDir, iconDir)));

    const newIcons = fse
      .readdirSync(newIconsDir)
      .filter((iconDir) => isIconDir(path.join(newIconsDir, iconDir)));

    oldIcons.map((icon) => {
      const subDirs = glob
        .sync('./**/*.[tj]s', {
          cwd: path.resolve(oldIconsDir, icon),
        })
        .map(path.dirname);
      for (const subFile of subDirs) {
        fse.outputFileSync(
          path.resolve(`./${name}/lib/${icon}/${subFile}`, `index.js`),
          EXPORT_TEMPLATES.LIB_DEFAULT(dependency, `${icon}/${subFile}`),
        );
        fse.outputFileSync(
          path.resolve(`./${name}/lib/${icon}/${subFile}`, `index.d.ts`),
          EXPORT_TEMPLATES.LIB_DEFAULT(dependency, `${icon}/${subFile}`),
        );
      }
    });
    newIcons.map((icon) => {
      const subFiles = glob
        .sync('./**/*.[tj]s', {
          cwd: path.resolve(newIconsDir, icon),
        })
        .map(path.dirname);

      for (const subFile of subFiles) {
        fse.outputFileSync(
          `./${name}/${icon}/${subFile}/index.js`,
          EXPORT_TEMPLATES.DEFAULT(`${dependency}/${icon}/${subFile}`),
        );
        fse.outputFileSync(
          `./${name}/${icon}/${subFile}/index.d.ts`,
          EXPORT_TEMPLATES.DEFAULT(`${dependency}/${icon}/${subFile}`),
        );
      }
    });
  },
  OTHER: (dependency, name) => {
    const TEMPLATE = hasExportDefault(dependency)
      ? EXPORT_TEMPLATES.DEFAULT
      : EXPORT_TEMPLATES.NAMED;
    fse.outputFileSync(`./${name}/index.js`, TEMPLATE(dependency));
    fse.outputFileSync(`./${name}/index.d.ts`, TEMPLATE(dependency));
  },
};

async function generateFiles(packages) {
  packages.forEach((dep) => {
    const [, name] = dep.split('/');

    if (name === 'utils') GENERATOR.UTILS(dep, name);
    if (name === 'icon') GENERATOR.ICONS(dep, name);
    GENERATOR.OTHER(dep, name);
  });
}

async function generateChangelogs(startDate, endDate = new Date()) {
  const now = new Date();
  const changeLogsByDates = await changeLogsByDate(startDate, endDate);
  const changeLogsByComponent = changeLogsByDates.reduce((acc, changeLogByDate) => {
    changeLogByDate.components.forEach((component) => {
      component.changes.forEach((change) => {
        acc[component.name] = acc[component.name] || [];
        acc[component.name].push({
          type: change.type,
          data: change.data,
        });
      });
    });
    return acc;
  }, {});
  const zeroPad = (num, places) => String(num).padStart(places, '0');
  const tmp = Object.keys(changeLogsByComponent)
    .sort()
    .reduce((tmp, name) => {
      const changes = changeLogsByComponent[name];
      tmp += `### ${name}\n\n`;
      changes
        .sort((a, b) => CHANGELOG_ORDER.indexOf(a.type) - CHANGELOG_ORDER.indexOf(b.type))
        .forEach((change) => {
          tmp += `- **${typeByChangeLog[change.type] || change.type}** ${change.data}\n`;
        });
      tmp += '\n';
      return tmp;
    }, `## [VERSION] - ${now.getFullYear()}-${zeroPad(now.getMonth() + 1, 2)}-${zeroPad(now.getDate(), 2)}\n\n`);

  fse.outputFileSync(
    './CHANGELOG.md',
    tmp + fse.readFileSync('./CHANGELOG.md', { encoding: 'utf8' }),
  );
}

async function main(pkg) {
  const info = JSON.parse(
    execSync(`npm_config_registry=${REGISTRY_URL} yarn info ${pkg.name} --json`, {
      cwd: __dirname,
    }).toString(),
  );
  await removeDirectory();
  await installComponents(components.packages);
  await generateFiles(components.packages);
  await generateChangelogs(info.data.time[info.data.version]);
  execSync('yarn test', {
    stdio: 'inherit',
    cwd: __dirname,
  });
}

main(pkg).catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
