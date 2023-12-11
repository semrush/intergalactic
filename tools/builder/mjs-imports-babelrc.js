module.exports = () => ({
  plugins: [
    ['replace-import-extension', { extMapping: { '.json': '.json', '': '.mjs', '.css': '.css' } }],
  ],
});
