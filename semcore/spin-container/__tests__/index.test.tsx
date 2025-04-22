import * as React from 'react';
import { describe } from '@semcore/testing-utils/vitest';

import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('spin-container Dependency imports', () => {
  runDependencyCheckTests('spin-container');
});
