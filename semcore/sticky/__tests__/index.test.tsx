import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup } from '@semcore/testing-utils/testing-library';
import { describe, beforeEach } from '@semcore/testing-utils/vitest';

import Sticky from '../src';

const { shouldSupportClassName, shouldSupportRef } = sharedTests;

describe('Sticky', () => {
  beforeEach(cleanup);

  shouldSupportClassName(Sticky);
  shouldSupportRef(Sticky);
});

describe('sticky Dependency imports', () => {
  runDependencyCheckTests('sticky');
});
