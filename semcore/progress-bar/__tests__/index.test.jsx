import { shouldHaveDataUiName, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup } from '@semcore/testing-utils/testing-library';
import { describe, beforeEach } from '@semcore/testing-utils/vitest';

import ProgressBar from '../src';

describe('progress-bar Dependency imports', () => {
  runDependencyCheckTests('progress-bar');
});

describe('ProgressBar', () => {
  beforeEach(cleanup);

  shouldHaveDataUiName({
    Component: ProgressBar,
    expectedDataUiName: 'ProgressBar',
  });
});
