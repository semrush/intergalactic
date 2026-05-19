import React from 'react';

import { cleanup, render } from '../testing-library';
import { test, expect } from '../vitest';
import { getContractTestMarker } from './contractTestUtils';

export const shouldSupportChildren = (
  Component: any,
  Wrapper: any = React.Fragment,
  props: any = {},
) => {
  test.sequential('should render children', () => {
    cleanup();

    const marker = getContractTestMarker('children');
    const { baseElement } = render(
      <Wrapper>
        <Component {...props}>
          <span data-contract-child={marker}>contract child</span>
        </Component>
      </Wrapper>,
    );

    expect(baseElement.querySelector(`[data-contract-child="${marker}"]`)).toBeTruthy();
  });
};
