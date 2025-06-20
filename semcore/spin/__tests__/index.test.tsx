import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { describe } from '@semcore/testing-utils/vitest';
import * as React from 'react';

describe('spin Dependency imports', () => {
  runDependencyCheckTests('spin');
});
