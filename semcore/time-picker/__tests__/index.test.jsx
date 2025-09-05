import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { describe } from '@semcore/testing-utils/vitest';

describe('time-picker Dependency imports', () => {
  runDependencyCheckTests('time-picker');
});
