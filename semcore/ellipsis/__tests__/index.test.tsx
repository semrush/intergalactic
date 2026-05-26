import { shouldHaveDataUiName, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { describe } from '@semcore/testing-utils/vitest';

import Ellipsis from '../src';

describe('ellipsis Dependency imports', () => {
  runDependencyCheckTests('ellipsis');
});

describe('Ellipsis data-ui-name', () => {
  shouldHaveDataUiName({
    Component: Ellipsis,
    props: { children: 'Ellipsis' },
    expectedDataUiName: 'Ellipsis',
  });
});
