const { exec } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

const rootPath = path.resolve(process.cwd(), '__tests__');

describe('Flag Sprite', () => {
  test('Should render correctly', async () => {
    const result = await cli(rootPath);
    expect(result.code).toBe(0);

    const files = [
      'sprites/sprite@1x.css',
      'sprites/sprite@2x.css',
      'sprites/sprite@1x.png',
      'sprites/sprite@2x.png',
    ];
    const isExistFiles = await Promise.all(
      files.map(async (file) => await fs.pathExists(`${rootPath}/lib/${file}`)),
    );
    isExistFiles.forEach((bool, ind) => {
      if (!bool) {
        expect(bool).toBeTruthy();
        throw Error(`File ${files[ind]} don't create`);
      }
    });
  });

  test('Should render correctly css content', async () => {
    const CssFiles = glob.sync(`${rootPath}/lib/**/*.css`);
    await Promise.all(
      CssFiles.map(async (filePath) => {
        const libCss = await fs.readFile(filePath, 'utf-8');
        const fixtureCss = await fs.readFile(
          filePath.replace('__tests__', '__tests__/__fixtures__'),
          'utf-8',
        );

        expect(libCss).toBe(fixtureCss);
      }),
    );
  });
});

function cli(cwd) {
  return new Promise((resolve) => {
    exec(`node ${path.resolve(`${rootPath}/script`)}`, { cwd }, (error, stdout, stderr) => {
      if (error && error.code) {
        throw Error(error);
      }
      resolve({
        code: error && error.code ? error.code : 0,
        error,
        stdout,
        stderr,
      });
    });
  });
}
