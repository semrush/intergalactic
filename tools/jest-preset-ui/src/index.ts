// module.exports = {
//   setupTests: require('./setupTests'),
//   snapshot: require('./snapshot'),
//   testing: require('./testing'),
//   shared: require('./shared'),
// };

import { setupTests } from './setupTests';
// setupTests();
export * as setupTests from './setupTests';
export { snapshot } from './snapshot';
export * as testing from './testing';
export * as shared from './shared';
