/**
 * When using custom loaders like `tsm` to add TypeScript & module support to scripts,
 * Node.js outputs a known set of warnings, which distract from the actual script output.
 *
 * By adding `--require=./.ci/tsm-filter-warnings.js` to the `node` or `tsm` args,
 * this script filters those known warnings (but not any others) from the output.
 */

// Remove Node's built-in `warning` listener which outputs all warnings to stderr
process.removeAllListeners('warning');

// Add our own version that skips known warnings
process.on('warning', (warning) => {
  let { name, message } = warning;
  if (name === 'ExperimentalWarning') {
    if (message.includes('Custom ESM Loaders is an experimental feature.')) return;
    if (message.includes('--experimental-loader')) return;
  }
  if (name === 'DeprecationWarning' && message.includes('Obsolete loader hook')) return;

  console.warn(warning);
});
