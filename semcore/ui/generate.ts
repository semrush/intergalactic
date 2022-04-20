import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs-extra';
import glob from 'glob';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const filename = fileURLToPath(import.meta.url);
const dirname = path.resolve(filename, '..');

const components = fs.readJSONSync(path.resolve(dirname, './components.json'));

const REGISTRY_URL = 'https://registry.npmjs.org/';
const EXPORT_DEFAULT_REG = /export ({ default }|default)/gm;

const removeDirectory = async () => {
  const toRemove = [...glob.sync('!(*.*|__tests__)'), 'yarn.lock'];
  try {
    await Promise.all(toRemove.map((filePath) => fs.remove(path.resolve(dirname, filePath))));
  } catch (e) {}
};

const installComponents = (packages: string[]) => {
  execSync(`npm_config_registry=${REGISTRY_URL} yarn add ${packages.join(' ')} -E`, {
    stdio: 'inherit',
    cwd: dirname,
  });

  const execOptions = { cwd: dirname };
  execSync('mkdir -p ./node_modules/@semcore', execOptions);
  const nestedNodeModules = execSync(
    'find ./node_modules/@semcore -name "node_modules" -type d',
    execOptions,
  ).toString();

  if (nestedNodeModules) {
    throw new Error(`Nested node_modules found:\n${nestedNodeModules}`);
  }
};

const hasExportDefault = async (dependency: string) => {
  const require = createRequire(import.meta.url);

  try {
    const resolved = require(dependency);
    return Object.hasOwnProperty.call(resolved, 'default');
  } catch (e) {
    // fallback resolver
    const dependencyPkgJson = require.resolve(dependency + '/package.json');
    const { module } = fs.readJsonSync(dependencyPkgJson);

    if (!module) return true;

    const dependencyES6EntryPath = require.resolve(dependency + `/${module}`);
    const ES6EntryContent = fs.readFileSync(dependencyES6EntryPath, 'utf8');
    return ES6EntryContent.match(EXPORT_DEFAULT_REG) !== null;
  }
};

const EXPORT_TEMPLATES = {
  LIB_DEFAULT: (lib: string, component: string) =>
    `export { default } from '${lib}/lib/${component}';\nexport * from '${lib}/lib/${component}';`,
  LIB_NAMED: (lib: string, component: string) => `export * from '${lib}/lib/${component}';`,
  DEFAULT: (lib: string) => `export { default } from '${lib}';\nexport * from '${lib}';`,
  NAMED: (lib: string) => `export * from '${lib}';`,
} as const;

const GENERATOR = {
  UTILS: async (dependency: string, name: string) => {
    const require = createRequire(import.meta.url);
    const utilsMain = require.resolve(dependency);
    const utilsPath = path.join(utilsMain, '..');
    const utils = glob.sync('**/*.+(js|ts)', { cwd: utilsPath });
    for (const util of utils) {
      const utilsModule = `${utilsPath}/${util.replace('.d.ts', '.js')}`;

      // index.js of utils throws & useless, so we copy it
      if (util.replace('.d.ts', '.js') === 'index.js') {
        await fs.copy(`${utilsPath}/${util}`, `./${name}/lib/${util}`);
        continue;
      }

      const TEMPLATE = (await hasExportDefault(utilsModule))
        ? EXPORT_TEMPLATES.LIB_DEFAULT
        : EXPORT_TEMPLATES.LIB_NAMED;
      await fs.outputFile(
        `./${name}/lib/${util}`,
        TEMPLATE(dependency, util.replace('.d.ts', '').replace('.js', '')),
      );
    }
  },
  ICONS: async (dependency: string, name: string) => {
    const require = createRequire(import.meta.url);
    const iconPath = require.resolve(dependency);

    const oldIconsDir = path.join(iconPath, '../..');
    const newIconsDir = path.join(iconPath, '../../..');

    const isIconDir = (dir) =>
      fs.statSync(dir).isDirectory() &&
      !['__tests__', 'src', 'svg', 'svg-new', 'node_modules'].includes(path.basename(dir));
    const oldIcons = fs
      .readdirSync(oldIconsDir)
      .filter((iconDir) => isIconDir(path.join(oldIconsDir, iconDir)));

    const newIcons = fs
      .readdirSync(newIconsDir)
      .filter((iconDir) => isIconDir(path.join(newIconsDir, iconDir)));

    for (const icon of oldIcons) {
      const subDirs = glob
        .sync('./**/*.[tj]s', {
          cwd: path.resolve(oldIconsDir, icon),
        })
        .map(path.dirname);
      for (const subFile of subDirs) {
        await fs.outputFile(
          path.resolve(`./${name}/lib/${icon}/${subFile}`, `index.js`),
          EXPORT_TEMPLATES.LIB_DEFAULT(dependency, `${icon}/${subFile}`),
        );
        await fs.outputFile(
          path.resolve(`./${name}/lib/${icon}/${subFile}`, `index.d.ts`),
          EXPORT_TEMPLATES.LIB_DEFAULT(dependency, `${icon}/${subFile}`),
        );
      }
    }
    for (const icon of newIcons) {
      const subFiles = glob
        .sync('./**/*.[tj]s', {
          cwd: path.resolve(newIconsDir, icon),
        })
        .map(path.dirname);

      for (const subFile of subFiles) {
        await fs.outputFile(
          `./${name}/${icon}/${subFile}/index.js`,
          EXPORT_TEMPLATES.DEFAULT(`${dependency}/${icon}/${subFile}`),
        );
        await fs.outputFile(
          `./${name}/${icon}/${subFile}/index.d.ts`,
          EXPORT_TEMPLATES.DEFAULT(`${dependency}/${icon}/${subFile}`),
        );
      }
    }
  },
  OTHER: async (dependency: string, name: string) => {
    const TEMPLATE = (await hasExportDefault(dependency))
      ? EXPORT_TEMPLATES.DEFAULT
      : EXPORT_TEMPLATES.NAMED;
    await fs.outputFile(`./${name}/index.js`, TEMPLATE(dependency));
    await fs.outputFile(`./${name}/index.d.ts`, TEMPLATE(dependency));
  },
};

const generateFiles = async (packages: string[]) => {
  for (const dep of packages) {
    const [, name] = dep.split('/');

    if (name === 'utils') await GENERATOR.UTILS(dep, name);
    if (name === 'icon') await GENERATOR.ICONS(dep, name);
    await GENERATOR.OTHER(dep, name);
  }
};

await removeDirectory();
await installComponents(components.packages);
await generateFiles(components.packages);

execSync('yarn test', {
  stdio: 'inherit',
  cwd: dirname,
});
