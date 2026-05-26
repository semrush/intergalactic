import { shouldHaveDataUiName, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup } from '@semcore/testing-utils/testing-library';
import { describe, beforeEach } from '@semcore/testing-utils/vitest';

import Divider from '../src';

describe('Divider Dependency imports', () => {
  runDependencyCheckTests('divider');
});

describe('Divider', () => {
  beforeEach(cleanup);

  shouldHaveDataUiName({
    Component: Divider,
    expectedDataUiName: 'Divider',
  });
});
