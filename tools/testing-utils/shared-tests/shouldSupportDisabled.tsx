import React from 'react';

import { test, expect } from '../vitest';
import { renderWithContractTarget } from './contractTestUtils';

export const shouldSupportDisabled = (
  Component: any,
  Wrapper: any = React.Fragment,
  props: any = {},
) => {
  test.sequential('should support disabled state', () => {
    const { target } = renderWithContractTarget(Component, Wrapper, {
      ...props,
      disabled: true,
    });

    expect(
      target.hasAttribute('disabled') || target.getAttribute('aria-disabled') === 'true',
    ).toBe(true);
  });
};
