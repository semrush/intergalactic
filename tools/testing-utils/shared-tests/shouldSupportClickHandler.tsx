import React from 'react';

import { fireEvent } from '../testing-library';
import { test, expect, vi } from '../vitest';
import { renderWithContractTarget } from './contractTestUtils';

export const shouldSupportClickHandler = (
  Component: any,
  Wrapper: any = React.Fragment,
  props: any = {},
) => {
  test.sequential('should call user onClick handler', () => {
    const onClick = vi.fn();
    const { target } = renderWithContractTarget(Component, Wrapper, {
      ...props,
      onClick,
    });

    fireEvent.click(target);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
};
