import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { describe } from '@semcore/testing-utils/vitest';

describe('spin-container Dependency imports', () => {
  runDependencyCheckTests('spin-container');
});
