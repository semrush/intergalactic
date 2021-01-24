#!/usr/bin/env node

const execSync = require('child_process').execSync;
const exec = require('child_process').exec;
const argv = require('minimist')(process.argv.slice(2));

function runSync(name, ...args) {
  const command = BUILD[name](...args);
  execSync(command, { stdio: [0, 1, 2] });
}

function run(name, cb, ...args) {
  const command = BUILD[name](...args);
  exec(command, { stdio: [0, 1, 2] }, (err, stdout, stderr) => {
    cb && cb();
    if (stdout) {
      console.log(name, '---', stdout);
    }
    if (stderr) {
      console.error(name, '---', stderr);
    }
  });
}

function removeTrash(output) {
  const command = `find lib/${output}/ -type f -name "*.d.ts" -delete`;
  return () => {
    exec(command, { stdio: [0, 1, 2] });
  };
}

const MAP_CONFIG = {
  js: ['--extensions ".js"', '--ignore "**/*.d.ts"'],
  ts: ['--extensions ".ts,.tsx"'],
};

let babelArgs = ['--presets=babel-preset-ui', '--no-babelrc', '--source-maps', '--copy-files'];

if (argv.source === 'js') {
  babelArgs = [...babelArgs, ...MAP_CONFIG.js];
} else {
  babelArgs = [...babelArgs, ...MAP_CONFIG.ts];
}

const BUILD = {
  CLEANUP: () => 'rm -rf ./lib',
  TYPES: (output = 'types') => `tsc --emitDeclarationOnly --baseUrl ./src --outDir ./lib/${output}`,
  CJS: (output = 'cjs') =>
    [`BABEL_ENV=commonjs babel ./src --out-dir ./lib/${output}`, ...babelArgs].join(' '),
  ES6: (output = 'es6') =>
    [`BABEL_ENV=es6 babel ./src --out-dir ./lib/${output}`, ...babelArgs].join(' '),
  COPY_TYPES: (output = 'types') =>
    `mkdir -p ./lib/${output} && find ./src -name *.d.ts -exec cp {} ./lib/${output} ";"`,
  // PURECSS: [
  //   'postcss ./src/style/*.shadow.css --dir ./lib/style',
  //   '--no-map',
  //   `--config ${path.resolve(__dirname, '..')}`,
  // ].join(' '),
};

console.log('RUN', process.cwd(), '\n');

runSync('CLEANUP');

if (argv.modules) {
  run('TYPES', '');
  if (argv.modules === 'cjs') {
    run('CJS', removeTrash(''), '');
  }
  if (argv.modules === 'es6') {
    run('ES6', removeTrash(''), '');
  }
} else {
  run('CJS', removeTrash('cjs'));
  run('ES6', removeTrash('es6'));

  if (argv.source === 'js') {
    run('COPY_TYPES');
  } else {
    run('TYPES');
  }
}
// run(BUILD, 'PURECSS');
