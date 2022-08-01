module.exports = () => ({
  plugins: [['replace-import-extension', { extMapping: { '': '.mjs' } }]],
});
