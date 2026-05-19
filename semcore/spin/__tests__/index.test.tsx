import { runComponentContractTests, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup } from '@semcore/testing-utils/testing-library';
import { beforeEach, describe } from '@semcore/testing-utils/vitest';

import Spin from '../src';

describe('spin Dependency imports', () => {
  runDependencyCheckTests('spin');
});

describe('Spin', () => {
  beforeEach(cleanup);

  runComponentContractTests({
    Component: Spin,
    expectedDataUiName: 'Spin',
    preset: 'leaf',
  });
});
