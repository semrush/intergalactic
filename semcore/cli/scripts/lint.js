const path = require('path');
const fsPromises = require('fs-extra');

const { task, getTaskOptions, question } = require('./utils/task');
const { cwdPath, rootPath, args } = getTaskOptions();

const tscConfig = require(`${rootPath}/tsconfig.json`);

module.exports = (async function init() {
  const destination = await question(args, {
    type: 'input',
    name: 'destination',
    default: 'components',
    message: 'Please enter destination name',
  });

  const filePath = path.resolve(`${cwdPath}/${destination}`);

  tscConfig.compilerOptions = Object.assign(tscConfig.compilerOptions, {
    baseUrl: filePath,
  });

  let esLintConfig = await fsPromises.readFile(`${rootPath}/.eslintrc`);
  esLintConfig = JSON.parse(esLintConfig);

  const files = [`${cwdPath}/.eslintrc`, `${cwdPath}/tsconfig.json`];
  const data = [esLintConfig, tscConfig];

  esLintConfig.parserOptions = {
    ...esLintConfig.parserOptions,
    project: files[1],
  };

  const isExistsFiles = await Promise.all(files.map((file) => fsPromises.pathExists(file)));

  const MAP_CONFIGS = isExistsFiles.map((isExistsFile, ind) => ({
    isExistsFile,
    file: files[ind],
    config: data[ind],
  }));

  // copy
  await Promise.all(
    MAP_CONFIGS.filter((element) => !element.isExistsFile).map((element) => {
      const { file, config } = element;
      return fsPromises.writeFile(file, JSON.stringify(config, null, 2));
    }),
  );

  task(`npm run lint:ts -- --project ${files[1]} --noEmit`, ['destination']);

  task(`npm run lint:es -- ${filePath}`, ['destination']);
})();
