import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { describe } from '@semcore/testing-utils/vitest';

describe('Animation Dependency imports', () => {
  runDependencyCheckTests('animation');
});
