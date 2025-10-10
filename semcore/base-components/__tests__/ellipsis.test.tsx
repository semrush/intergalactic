import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { describe } from '@semcore/testing-utils/vitest';
import React, { useRef } from 'react';

describe('ellipsis Dependency imports', () => {
  runDependencyCheckTests('ellipsis');
});
