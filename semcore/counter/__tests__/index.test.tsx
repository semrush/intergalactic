import { shouldHaveDataUiName, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup } from '@semcore/testing-utils/testing-library';
import { beforeEach, describe } from '@semcore/testing-utils/vitest';

import Counter from '../src';

describe('Counter Dependency imports', () => {
  runDependencyCheckTests('counter');
});

describe('Counter', () => {
  beforeEach(cleanup);

  shouldHaveDataUiName({
    Component: Counter,
    expectedDataUiName: 'Counter',
  });
});
