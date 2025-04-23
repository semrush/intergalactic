import React from 'react';
import { describe } from '@semcore/testing-utils/vitest';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('breadcrumbs Dependency imports', () => {
  runDependencyCheckTests('breadcrumbs');
});
