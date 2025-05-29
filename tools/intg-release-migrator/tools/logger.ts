const start = Date.now();
export const log = (message: string) => {
  const secondsPassed = ((Date.now() - start) / 1000).toFixed(1);
  // biome-ignore lint/suspicious/noConsole: explanation
  console.log(`[${secondsPassed}s] ${message}`);
};
