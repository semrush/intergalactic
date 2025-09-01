import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { describe } from '@semcore/testing-utils/vitest';

describe('errors Dependency imports', () => {
  runDependencyCheckTests('errors');
});
