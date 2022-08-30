const { configureAxe } = require('jest-axe');
const testing = require('@testing-library/react');
require('@testing-library/jest-dom');

const axe = configureAxe({
  globalOptions: {
    rules: [{ id: 'tabindex', enabled: false }],
  },
});
module.exports = testing;
module.exports.axe = axe;
