import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { describe } from '@semcore/testing-utils/vitest';

describe('Breakpoints Dependency imports', () => {
  runDependencyCheckTests('breakpoints');
});
