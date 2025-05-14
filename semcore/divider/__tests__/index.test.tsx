import React from 'react';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { describe, beforeEach } from '@semcore/testing-utils/vitest';
import Divider from '../src';

import { cleanup } from '@semcore/testing-utils/testing-library';
const { shouldSupportClassName, shouldSupportRef } = sharedTests;
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('Divider Dependency imports', () => {
  runDependencyCheckTests('divider');
});

describe('Divider', () => {
  beforeEach(cleanup);

  shouldSupportRef(Divider);
  shouldSupportClassName(Divider);
});
