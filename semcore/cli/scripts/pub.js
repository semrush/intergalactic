const path = require('path');

const { task, getTaskOptions, question } = require('./utils/task');
const { cwdPath, args } = getTaskOptions();

module.exports = (async function init() {
  const destination = await question(args, {
    type: 'input',
    name: 'destination',
    default: 'components',
    message: 'Please enter destination name',
  });

  const filePath = path.resolve(`${cwdPath}/${destination}`);

  task(`npm run pub -- --root=${filePath}`, ['destination']);
})();
