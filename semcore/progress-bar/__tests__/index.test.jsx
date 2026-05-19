import { runComponentContractTests, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup } from '@semcore/testing-utils/testing-library';
import { describe, beforeEach } from '@semcore/testing-utils/vitest';

import ProgressBar from '../src';

describe('progress-bar Dependency imports', () => {
  runDependencyCheckTests('progress-bar');
});

describe('ProgressBar', () => {
  beforeEach(cleanup);

  runComponentContractTests({
    Component: ProgressBar,
    expectedDataUiName: 'ProgressBar',
    preset: 'root',
  });
});
