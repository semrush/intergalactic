import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { describe } from '@semcore/testing-utils/vitest';

describe('Badge Dependency imports', () => {
  runDependencyCheckTests('status-badge');
});
