import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { describe } from '@semcore/testing-utils/vitest';
import * as React from 'react';

describe('skeleton Dependency imports', () => {
  runDependencyCheckTests('skeleton');
});
