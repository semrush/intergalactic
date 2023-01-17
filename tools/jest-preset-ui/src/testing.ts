// // const { configureAxe } = require('jest-axe');

// // const axe = configureAxe({
// //   globalOptions: {
// //     rules: [{ id: 'tabindex', enabled: false }],
// //   },
// // });
// module.exports = {} //require('@testing-library/react');
// module.exports.axe = {}//axe;

import { configureAxe } from 'jest-axe';
import reactTestingLibrary from '@testing-library/react';
export * from '@testing-library/react';

export const axe = configureAxe({
  globalOptions: {
    rules: [{ id: 'tabindex', enabled: false }],
  },
});
export default reactTestingLibrary;
