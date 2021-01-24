module.exports = {
  rules: {
    'no-src-import': require('./rules/no-src-import'),
  },
  configs: {
    internal: {
      plugins: ['semcore'],
      rules: {
        'semcore/no-src-import': 2,
      },
    },
  },
};
