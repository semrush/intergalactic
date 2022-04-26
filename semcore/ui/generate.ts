import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs-extra';
import glob from 'fast-glob';
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
  execSync(`npm_config_registry=${REGISTRY_URL} yarn add ${packages.join(' ')} --exact`, {
    stdio: 'inherit',
    cwd: dirname,
  });

  const nestedNodeModulesAllowList = {
    // remove after external theme update (https://github.com/semrush/intergalactic/tree/feature/restyling) will be merged (approx may 10 2022)
    './node_modules/@semcore/project-create/node_modules/final-form': '4.18.7',
    './node_modules/@semcore/project-create/node_modules/react-final-form': '6.3.5',
    './node_modules/@semcore/utils/node_modules/classnames': '2.3.1',
    './node_modules/@semcore/chart/node_modules/@upsetjs/venn.js': '1.4.2',
    // Exclude @semcore/chart from @semcore/ui and remove followings
    './node_modules/@semcore/chart/node_modules/d3-selection': '3.0.0',
    './node_modules/@semcore/d3-chart/node_modules/d3-array': '3.1.6',
    './node_modules/@semcore/d3-chart/node_modules/d3-color': '3.1.0',
    './node_modules/@semcore/d3-chart/node_modules/d3-interpolate': '3.0.1',
    './node_modules/@semcore/d3-chart/node_modules/internmap': '2.0.3',
  };

  const nestedNodeModules = glob
    .sync('**/node_modules/**/package.json', {
      cwd: path.resolve(dirname, 'node_modules/@semcore'),
    })
    .map(
      (packageFilePath) =>
        './node_modules/@semcore/' +
        packageFilePath.substring(0, packageFilePath.length - '/package.json'.length),
    )
    .map((relativePath) => {
      const { version } = fs.readJsonSync(path.resolve(dirname, relativePath, 'package.json'));

      return `${relativePath} @${version}`;
    })
    .filter((dependency) => {
      const [relativePath, version] = dependency.split(' @');
      if (!nestedNodeModulesAllowList[relativePath]) return true;
      return nestedNodeModulesAllowList[relativePath] !== version;
    });

  if (nestedNodeModules.length > 0) {
    throw new Error(`Nested node_modules found:\n- ${nestedNodeModules.join('\n- ')}\n`);
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

type ExportExtensions = 'js' | 'd.ts' | 'cjs' | 'mjs';
const exportExtensions: ExportExtensions[] = ['js', 'd.ts', 'cjs', 'mjs'];

const EXPORT_TEMPLATES: {
  [extention in ExportExtensions]: {
    LIB_DEFAULT: (lib: string, component: string) => string;
    LIB_NAMED: (lib: string, component: string) => string;
    DEFAULT: (lib: string) => string;
    NAMED: (lib: string) => string;
  };
} = {
  cjs: {
    LIB_DEFAULT: (lib: string, component: string) =>
      `module.exports = require('${lib}/lib/${component}');`,
    LIB_NAMED: (lib: string, component: string) =>
      `module.exports = require('${lib}/lib/${component}');`,
    DEFAULT: (lib: string) => `module.exports = require('${lib}');`,
    NAMED: (lib: string) => `module.exports = require('${lib}');`,
  },
  mjs: {
    LIB_DEFAULT: (lib: string, component: string) =>
      `export { default } from '${lib}/lib/${component}';\nexport * from '${lib}/lib/${component}';`,
    LIB_NAMED: (lib: string, component: string) => `export * from '${lib}/lib/${component}';`,
    DEFAULT: (lib: string) => `export { default } from '${lib}';\nexport * from '${lib}';`,
    NAMED: (lib: string) => `export * from '${lib}';`,
  },
  get js() {
    return EXPORT_TEMPLATES.mjs;
  },
  get 'd.ts'() {
    return EXPORT_TEMPLATES.mjs;
  },
} as const;

const GENERATOR = {
  UTILS: async (dependency: string, name: string) => {
    const require = createRequire(import.meta.url);
    const utilsMain = require.resolve(dependency);
    const utilsPath = path.join(utilsMain, '..');
    const utils = glob.sync('**/*.+(js|ts)', { cwd: utilsPath });
    for (const util of utils) {
      const utilNameWithoutExtention = util.replace(/\.(d\.)?(t|j)s$/, '');

      // index.js of utils throws & useless, so we copy it
      if (utilNameWithoutExtention === 'index') {
        await fs.copy(`${utilsPath}/${util}`, `./${name}/lib/${util}`);
        continue;
      }

      for (const extension of exportExtensions) {
        const defaultExport = await hasExportDefault(`${utilsPath}/${utilNameWithoutExtention}`);
        const template = defaultExport
          ? EXPORT_TEMPLATES[extension].LIB_DEFAULT
          : EXPORT_TEMPLATES[extension].LIB_NAMED;

        await fs.outputFile(
          `./${name}/lib/${utilNameWithoutExtention}.${extension}`,
          template(dependency, utilNameWithoutExtention),
        );
      }
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
        for (const extension of exportExtensions) {
          const template = EXPORT_TEMPLATES[extension].LIB_DEFAULT;

          await fs.outputFile(
            path.resolve(`./${name}/lib/${icon}/${subFile}`, `index.${extension}`),
            template(dependency, `${icon}/${subFile}`),
          );
        }
      }
    }
    for (const icon of newIcons) {
      const subFiles = glob
        .sync('./**/*.[tj]s', {
          cwd: path.resolve(newIconsDir, icon),
        })
        .map(path.dirname);

      for (const subFile of subFiles) {
        for (const extension of exportExtensions) {
          const template = EXPORT_TEMPLATES[extension].DEFAULT;
          await fs.outputFile(
            `./${name}/${icon}/${subFile}/index.${extension}`,
            template(`${dependency}/${icon}/${subFile}`),
          );
        }
      }
    }
  },
  OTHER: async (dependency: string, name: string) => {
    const defaultExport = await hasExportDefault(dependency);

    for (const extension of exportExtensions) {
      const template = defaultExport
        ? EXPORT_TEMPLATES[extension].DEFAULT
        : EXPORT_TEMPLATES[extension].NAMED;
      await fs.outputFile(`./${name}/index.${extension}`, template(dependency));
    }
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
