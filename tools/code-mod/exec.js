const { spawn } = require('child_process');
const path = require('path');

module.exports = (options) => {
  const { migrationPath, sourceDir, parser, extensions, ignorePattern } = options;
  const execPath = path.resolve(__dirname, 'node_modules', '.bin', 'jscodeshift');
  const j = spawn(execPath, [
    '-t',
    migrationPath,
    sourceDir,
    `--extensions=${extensions}`,
    `--parser=${parser}`,
  ]);

  j.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  j.on('error', (e) => console.error(e));

  j.on('exit', () => {
    console.log(`Code mod finished`);
  });
};
