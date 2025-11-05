import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { describe } from '@semcore/testing-utils/vitest';
import React from 'react';

describe('Base-components Dependency imports', () => {
  runDependencyCheckTests('base-components');
});
