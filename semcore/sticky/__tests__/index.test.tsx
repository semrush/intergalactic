import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { describe, beforeEach } from '@semcore/testing-utils/vitest';
import { cleanup } from '@semcore/testing-utils/testing-library';

const { shouldSupportClassName, shouldSupportRef } = sharedTests;
import Sticky from '../src';

describe('Sticky', () => {
  beforeEach(cleanup);

  shouldSupportClassName(Sticky);
  shouldSupportRef(Sticky);
});

import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('sticky Dependency imports', () => {
  runDependencyCheckTests('sticky');
});
