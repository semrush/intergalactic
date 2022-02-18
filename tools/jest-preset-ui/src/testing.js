const { configureAxe } = require('jest-axe');

const axe = configureAxe({
  globalOptions: {
    rules: [{ id: 'tabindex', enabled: false }],
  },
});
module.exports = require('@testing-library/react');
module.exports.axe = axe;
