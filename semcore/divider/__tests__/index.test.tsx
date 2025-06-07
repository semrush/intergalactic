import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup } from '@semcore/testing-utils/testing-library';
import { describe, beforeEach } from '@semcore/testing-utils/vitest';
import React from 'react';

import Divider from '../src';

const { shouldSupportClassName, shouldSupportRef } = sharedTests;

describe('Divider Dependency imports', () => {
  runDependencyCheckTests('divider');
});

describe('Divider', () => {
  beforeEach(cleanup);

  shouldSupportRef(Divider);
  shouldSupportClassName(Divider);
});
