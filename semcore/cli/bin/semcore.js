#!/usr/bin/env node

process.on('unhandledRejection', (err) => {
  throw err;
});

const { spawnSync } = require('child_process');
const path = require('path');

const args = process.argv.slice(2);

const scriptIndex = args.findIndex(
  (x) => x === 'build' || x === 'lint' || x === 'start' || x === 'test' || x === 'pub',
);
const script = scriptIndex === -1 ? args[0] : args[scriptIndex];
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];

if (['component', 'build', 'lint', 'start', 'test', 'pub'].includes(script)) {
  const result = spawnSync(
    process.execPath,
    nodeArgs
      .concat(require.resolve(path.resolve(__dirname, `../scripts/${script}.js`)))
      .concat(args.slice(scriptIndex + 1)),
    { stdio: 'inherit', shell: true },
  );
  if (result.signal) {
    if (result.signal === 'SIGKILL') {
      console.log('The build failed because the process exited too early. ');
    } else if (result.signal === 'SIGTERM') {
      console.log('The build failed because the process exited too early. ');
    }
    process.exit(1);
  }
  process.exit(result.status);
} else {
  console.log('Unknown script "' + script + '".');
}
