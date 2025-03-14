import { describe } from '@semcore/testing-utils/vitest';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('Breakpoints Dependency imports', () => {
  runDependencyCheckTests('breakpoints');
});
