import { shouldHaveDataUiName, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { describe } from '@semcore/testing-utils/vitest';
import * as React from 'react';

import SpinContainer from '../src';

const LoadingSpinContainer = ({ children }: { children: React.ReactNode }) => (
  <SpinContainer loading>{children}</SpinContainer>
);

describe('spin-container Dependency imports', () => {
  runDependencyCheckTests('spin-container');
});

describe('SpinContainer data-ui-name', () => {
  shouldHaveDataUiName({
    Component: SpinContainer,
    props: { children: 'SpinContainer' },
    expectedDataUiName: 'SpinContainer',
  });

  shouldHaveDataUiName({
    Component: SpinContainer.Content,
    Wrapper: SpinContainer,
    props: { children: 'Content' },
    expectedDataUiName: 'SpinContainer.Content',
  });

  shouldHaveDataUiName({
    Component: SpinContainer.Overlay,
    Wrapper: LoadingSpinContainer,
    expectedDataUiName: 'SpinContainer.Overlay',
  });
});
