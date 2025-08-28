export default (name: string) => {
  const mainBranch = import.meta.env.VITE_PLAYGROUND_MAIN_BRANCH;

  if (!mainBranch) {
    // eslint-disable-next-line no-console
    console.warn('VITE_PLAYGROUND_MAIN_BRANCH env is missed. Please add it to .env file');
    return null;
  }

  return `https://github.com/semrush/intergalactic/tree/${mainBranch}/semcore/${name}`;
};
