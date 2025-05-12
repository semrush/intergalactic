import path from 'path';
import fs from 'fs-extra';
import glob from 'fast-glob';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { Parser } from 'acorn';
import acornJSX from 'acorn-jsx';

const filename = fileURLToPath(import.meta.url);
const dirname = path.resolve(filename, '..');

const packageJson = fs.readJSONSync(path.resolve(dirname, 'package.json'));
const components = Object.keys(packageJson.dependencies ?? {});
const JSXParser = Parser.extend(acornJSX());

type PackageExportItem = {
  require: string;
  import: string;
  types?: string;
};

const packageJsonExports: Record<string, PackageExportItem> = {};

const hasExportDefault = async (dependency: string) => {
  const require = createRequire(import.meta.url);

  try {
    const resolved = require(dependency);
    return Object.hasOwnProperty.call(resolved, 'default');
  } catch (e) {
    // fallback resolver
    let dependencyDir = path.dirname(require.resolve(dependency));
    let module: string | null = null;
    while (dependencyDir.split('/').length > 2) {
      const dependencyPkgJson = path.resolve(dependencyDir, 'package.json');
      if (await fs.pathExists(dependencyPkgJson)) {
        const pkgJson = await fs.readJson(dependencyPkgJson);
        module = pkgJson.module;
        if (module) break;
      }
      dependencyDir = path.dirname(dependencyDir);
    }

    if (!module) return true;

    const dependencyES6EntryPath = path.resolve(`${dependencyDir}/${module}`);
    const es6EntryContent = await fs.readFile(dependencyES6EntryPath, 'utf8');
    const { body: ast } = JSXParser.parse(es6EntryContent, {
      ecmaVersion: 2021,
      sourceType: 'module',
    }) as any;

    return ast.some((node: any) => {
      if (node.type === 'ExportNamedDeclaration') {
        if (node.specifiers.some((specifier: any) => specifier.exported.name === 'default'))
          return true;
      }

      return node.type === 'ExportDefaultDeclaration';
    });
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
  UTILS: async (dependency: string) => {
    const name = 'core/lib/utils';
    const require = createRequire(import.meta.url);
    const utilsMain = require.resolve('@semcore/core');
    const utilsDistPath = path.join(utilsMain, '..', 'utils');
    const utils = glob.sync('**/*.+(js|ts|css)', { cwd: utilsDistPath });

    for (const util of utils) {
      if (util.endsWith('.css')) {
        await fs.outputFile(`./${name}/${util}`, `@import '@semcore/${name}/${util}';`);

        packageJsonExports[`./${name}/${util}`] = {
          require: `./${name}/${util}`,
          import: `./${name}/${util}`,
        };

        continue;
      }
      if (util.endsWith('.d.js')) {
        continue;
      }
      if (['reshadow', 'reshadow.d.ts'].includes(util)) {
        continue;
      }

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
          `./${name}/${utilNameWithoutExtention}.${extension}`,
          template(dependency, `utils/${utilNameWithoutExtention}`),
        );
      }

      packageJsonExports[`./${name}/${utilNameWithoutExtention}`] = {
        require: `./${name}/${utilNameWithoutExtention}.cjs`,
        import: `./${name}/${utilNameWithoutExtention}.mjs`,
        types: `./${name}/${utilNameWithoutExtention}.d.ts`,
      };
    }

    const themesDistPath = path.join(utilsMain, '..', 'theme');
    const themes = glob.sync('**/*.+(css)', { cwd: themesDistPath });

    for (const theme of themes) {
      await fs.outputFile(
        `./core/lib/theme/${theme}`,
        `@import '@semcore/core/lib/theme/${theme}';`,
      );

      packageJsonExports[`./core/lib/theme/${theme}`] = {
        require: `./core/lib/theme/${theme}`,
        import: `./core/lib/theme/${theme}`,
      };
    }
  },
  ICONS: async (dependency: string, name: string) => {
    const require = createRequire(import.meta.url);
    const iconPath = require.resolve(dependency);

    const oldIconsDir = path.join(iconPath, '../..');
    const newIconsDir = path.join(iconPath, '../../..');

    const isIconDir = (dir: string) =>
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

        const illustrationPath = `./${name}/${icon}${
          subFile && subFile !== '.' ? `/${subFile}` : ''
        }`;

        packageJsonExports[illustrationPath] = {
          require: `${illustrationPath}/index.cjs`,
          import: `${illustrationPath}/index.mjs`,
          types: `${illustrationPath}/index.d.ts`,
        };
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

    packageJsonExports[`./${name}`] = {
      require: `./${name}/index.cjs`,
      import: `./${name}/index.mjs`,
      types: `./${name}/index.d.ts`,
    };
  },
};

const generateFiles = async (packages: string[]) => {
  for (const dep of packages) {
    const [, name] = dep.split('/');

    if (name === 'core') {
      await GENERATOR.OTHER(dep, name);
      await GENERATOR.UTILS(dep);
    }
    if (name === 'icon') await GENERATOR.ICONS(dep, name);
    if (name === 'illustration') await GENERATOR.ICONS(dep, name);
    await GENERATOR.OTHER(dep, name);

    packageJson.exports = packageJsonExports;

    await fs.writeJson(path.resolve(dirname, 'package.json'), packageJson, { spaces: 2 });
  }
};

await generateFiles(components);
