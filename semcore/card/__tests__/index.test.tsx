import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { describe } from '@semcore/testing-utils/vitest';

describe('Card Dependency imports', () => {
  runDependencyCheckTests('card');
});
