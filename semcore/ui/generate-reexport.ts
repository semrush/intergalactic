import path from 'path';
import fs from 'fs-extra';
import glob from 'fast-glob';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const filename = fileURLToPath(import.meta.url);
const dirname = path.resolve(filename, '..');

const components = fs.readJSONSync(path.resolve(dirname, './components.json'));

const EXPORT_DEFAULT_REG = /export ({ default }|default)/gm;

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
    const utilsDistPath = path.join(utilsMain, '..');
    const utilsPath = path.join(utilsDistPath, '..');
    const utils = glob.sync('**/*.+(js|ts)', { cwd: utilsDistPath });
    for (const util of utils) {
      const utilNameWithoutExtention = util.replace(/\.(d\.)?(t|j)s$/, '');

      // index.js of utils throws & useless, so we copy it
      if (utilNameWithoutExtention === 'index') {
        await fs.copy(`${utilsDistPath}/${util}`, `./${name}/lib/${util}`);
        continue;
      }

      for (const extension of exportExtensions) {
        const defaultExport = await hasExportDefault(
          `${utilsDistPath}/${utilNameWithoutExtention}`,
        );
        const template = defaultExport
          ? EXPORT_TEMPLATES[extension].LIB_DEFAULT
          : EXPORT_TEMPLATES[extension].LIB_NAMED;

        await fs.outputFile(
          `./${name}/lib/${utilNameWithoutExtention}.${extension}`,
          template(dependency, utilNameWithoutExtention),
        );
      }
    }
    await fs.copy(`${utilsPath}/style`, `./${name}/style`);
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
            // normalize because "subFile" can be just "."
            template(path.normalize(`${dependency}/${icon}/${subFile}`)),
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
    if (name === 'illustration') await GENERATOR.ICONS(dep, name);
    await GENERATOR.OTHER(dep, name);
  }
};

await generateFiles(components.packages);
