import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { describe } from '@semcore/testing-utils/vitest';

describe('widget-empty Dependency imports', () => {
  runDependencyCheckTests('widget-empty');
});
