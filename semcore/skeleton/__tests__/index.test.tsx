import { shouldHaveDataUiName, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { describe } from '@semcore/testing-utils/vitest';
import * as React from 'react';

import SkeletonSVG from '../src';

describe('skeleton Dependency imports', () => {
  runDependencyCheckTests('skeleton');
});

describe('Skeleton data-ui-name', () => {
  shouldHaveDataUiName({
    Component: SkeletonSVG,
    props: { children: <SkeletonSVG.Text /> },
    expectedDataUiName: 'SkeletonSVG',
  });
});
