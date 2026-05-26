import { shouldHaveDataUiName, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { describe } from '@semcore/testing-utils/vitest';
import React from 'react';

import Breadcrumbs from '../src';

describe('breadcrumbs Dependency imports', () => {
  runDependencyCheckTests('breadcrumbs');
});

describe('Breadcrumbs data-ui-name', () => {
  shouldHaveDataUiName({
    Component: Breadcrumbs,
    props: { children: 'Breadcrumbs' },
    expectedDataUiName: 'Breadcrumbs',
  });

  shouldHaveDataUiName({
    Component: Breadcrumbs.Item,
    Wrapper: Breadcrumbs,
    props: { children: 'Item' },
    expectedDataUiName: 'Breadcrumbs.Item',
  });
});
