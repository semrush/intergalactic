import React from 'react';

import { test, expect } from '../vitest';
import { renderWithContractTarget } from './contractTestUtils';

export const shouldSupportStyle = (
  Component: any,
  Wrapper: any = React.Fragment,
  props: any = {},
) => {
  test.sequential('should support style prop', () => {
    const { target } = renderWithContractTarget(Component, Wrapper, {
      ...props,
      style: { marginLeft: '13px' },
    });

    expect((target as HTMLElement).style.marginLeft).toBe('13px');
  });
};
