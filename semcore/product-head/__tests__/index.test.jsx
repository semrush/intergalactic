import { shouldHaveDataUiName, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { describe } from '@semcore/testing-utils/vitest';

import ProductHead, { Info, Title } from '../src';

describe('product-head Dependency imports', () => {
  runDependencyCheckTests('product-head');
});

describe('ProductHead data-ui-name', () => {
  shouldHaveDataUiName({
    Component: ProductHead,
    props: { children: 'ProductHead' },
    expectedDataUiName: 'ProductHead',
  });

  shouldHaveDataUiName({
    Component: Info,
    props: { children: 'Info' },
    expectedDataUiName: 'Info',
  });

  shouldHaveDataUiName({
    Component: Title,
    props: { children: 'Title' },
    expectedDataUiName: 'Title',
  });
});
