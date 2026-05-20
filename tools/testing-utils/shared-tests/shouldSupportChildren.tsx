import React from 'react';

import { test, expect } from '../vitest';
import { getContractTestMarker, renderWithContractTarget } from './contractTestUtils';

export const shouldSupportChildren = (
  Component: any,
  Wrapper: any = React.Fragment,
  props: any = {},
) => {
  test.sequential('should render children', () => {
    const marker = getContractTestMarker('children');
    const { target } = renderWithContractTarget(
      Component,
      Wrapper,
      props,
      getContractTestMarker('children-target'),
      <span data-contract-child={marker}>contract child</span>,
    );

    expect(target.querySelector(`[data-contract-child="${marker}"]`)).toBeTruthy();
  });
};
