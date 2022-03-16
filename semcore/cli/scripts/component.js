const path = require('path');

const { task, getTaskOptions, question } = require('./utils/task');
const { rootPath, cwdPath, args } = getTaskOptions();

module.exports = (async function init() {
  const name = await question(args, {
    type: 'input',
    name: 'name',
    default: 'Button',
    message: 'Please enter component name',
  });

  const destination = await question(args, {
    type: 'input',
    name: 'destination',
    default: 'components',
    message: 'Please enter destination name',
  });

  const filePath = path.resolve(`${cwdPath}/${destination}`);

  // TODO plop worst work with cli
  task(
    `cd ./tools/generator-component && ${rootPath}/node_modules/.bin/plop component -- --name=${name} --destination=${filePath}`,
    ['name', 'destination'],
  );
})();
