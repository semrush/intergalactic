import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { describe } from '@semcore/testing-utils/vitest';

describe('product-head Dependency imports', () => {
  runDependencyCheckTests('product-head');
});
