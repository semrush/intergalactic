import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { describe } from '@semcore/testing-utils/vitest';

describe('progress-bar Dependency imports', () => {
  runDependencyCheckTests('progress-bar');
});
