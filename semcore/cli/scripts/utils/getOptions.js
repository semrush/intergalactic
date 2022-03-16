module.exports.getOptionsFromArgv = function (argv, delimiter = ' ') {
  const { length: lengthArgv } = argv;
  const args = {};
  for (let indexArgv = 0; indexArgv < lengthArgv; indexArgv++) {
    const command = argv[indexArgv];
    if (command.includes('--')) {
      const nextIndexArgv = indexArgv + 1;

      if (nextIndexArgv === lengthArgv) {
        args[command] = 1;
      } else {
        args[command] = argv[nextIndexArgv].includes('--') ? 1 : argv[nextIndexArgv];
      }
    }
  }

  return args;
};

module.exports.getArgvFromObject = function (params) {
  return Object.entries(params)
    .map((arr) => [arr[0], arr[1] === 1 ? '' : arr[1]])
    .flat()
    .join(' ');
};

module.exports.removeCommandsFromArgv = function (argv = [], commands = []) {
  const { length: lengthArgv } = argv;
  let nodeArgv = [];
  let indexRemove = null;
  for (let indexArgv = 0; indexArgv < lengthArgv; indexArgv++) {
    const command = argv[indexArgv];
    if (commands.includes(command)) {
      const nextIndexArgv = indexArgv + 1;
      if (indexArgv + 1 === lengthArgv) {
        continue;
      }
      if (!argv[nextIndexArgv].includes('--')) {
        indexRemove = indexArgv + 1;
      }
    } else if (indexRemove !== null) {
      indexRemove = null;
    } else {
      nodeArgv.push(command);
    }
  }

  return nodeArgv;
};
