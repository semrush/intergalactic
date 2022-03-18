import path from 'path';
import { task, getTaskOptions, question } from './utils/task';

const { cwdPath, args } = getTaskOptions();

(async function init() {
  const destination = await question(args, {
    type: 'input',
    name: 'destination',
    default: 'components',
    message: 'Please enter destination name',
  });

  const filePath = path.resolve(`${cwdPath}/${destination}`);

  task(`npm run pub -- --root=${filePath}`, ['destination']);
})();
