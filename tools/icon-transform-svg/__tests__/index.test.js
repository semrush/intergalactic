const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');
const { exec } = require('child_process');
const pluginTester = require('babel-plugin-tester');

const rootPath = path.resolve(__dirname);

function cli(scriptPath, cwd, args = []) {
  return new Promise((resolve) => {
    exec(
      `node ${path.resolve(scriptPath)} ${args.join(' ')} && pnpm format ${rootPath}`,
      { cwd },
      (error, stdout, stderr) => {
        if (error?.code) {
          throw Error(error);
        }
        resolve({
          code: error?.code ? error.code : 0,
          error,
          stdout,
          stderr,
        });
      },
    );
  });
}

async function checkDistFiles(publicPath, familyIcons, opt, iconPath) {
  try {
    if (!iconPath) {
      iconPath = glob.sync(`${publicPath}/${familyIcons}/**/*.svg`)[0];
      iconPath = iconPath.replace('.svg', '').split('/').slice(opt.slice).join('/');
    }
    const isJSPathExists = await fs.pathExists(`${opt.rootPath || rootPath}/${iconPath}/index.js`);
    const isDTSPathExists = await fs.pathExists(
      `${opt.rootPath || rootPath}/${iconPath}/index.d.ts`,
    );

    expect(isJSPathExists).toBeTruthy();
    expect(isDTSPathExists).toBeTruthy();
  } catch (error) {
    console.error(error);
    throw Error(
      `Failed to compile ${familyIcons} images from ${publicPath
        .split('/')
        .slice(-1)}/${familyIcons}`,
    );
  }
}

const familyNameIcons = ['color', 'external', 'pay', 'path', 'pathNew'];
pluginTester({
  plugin: () => ({}),
  pluginName: 'Compare files svg old',
  filename: __filename,
  tests: familyNameIcons.flatMap((name) => {
    const files = glob.sync(`${rootPath}/lib/${name}/**/*.js`);
    return files.map((filePath) => ({
      title: `File ${filePath.split('/').slice(-3).join('/')} don't have change`,
      fixture: filePath,
      outputFixture: filePath.replace('__tests__/lib', '__tests__/__fixtures__'),
    }));
  }),
});

pluginTester({
  plugin: () => ({}),
  pluginName: 'Compare files svg new',
  filename: __filename,
  tests: familyNameIcons.flatMap((name) => {
    const files = glob.sync(`${rootPath}/${name}/**/*.js`);
    return files.map((filePath) => ({
      title: `File ${filePath.split('/').slice(-3).join('/')} don't have change`,
      fixture: filePath,
      outputFixture: filePath.replace('__tests__', '__tests__/__fixtures__'),
    }));
  }),
});
