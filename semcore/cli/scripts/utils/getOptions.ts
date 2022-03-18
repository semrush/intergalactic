type Args = { [key: string]: string | number };

export const getOptionsFromArgv = function (argv: string[]): Args {
  const { length: lengthArgv } = argv;
  const args: Args = {};
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

export const getArgvFromObject = function (params: Args): string {
  return Object.entries(params)
    .map((arr) => [arr[0], arr[1] === 1 ? '' : arr[1]])
    .flat()
    .join(' ');
};

export const removeCommandsFromArgv = function (
  argv: string[] = [],
  commands: string[] = [],
): string[] {
  const { length: lengthArgv } = argv;
  const nodeArgv: string[] = [];
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
