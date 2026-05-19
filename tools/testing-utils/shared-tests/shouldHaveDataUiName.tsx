import React from 'react';

import { test, expect } from '../vitest';
import { renderWithContractTarget } from './contractTestUtils';

export const shouldHaveDataUiName = (
  Component: any,
  Wrapper: any = React.Fragment,
  props: any = {},
  expectedName: string,
) => {
  test.sequential(`should have data-ui-name="${expectedName}"`, () => {
    const { target } = renderWithContractTarget(Component, Wrapper, props);

    expect(target.getAttribute('data-ui-name')).toBe(expectedName);
  });
};
