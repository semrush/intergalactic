import React from 'react';

import { test, expect } from '../vitest';
import { getContractTestMarker, renderWithContractTarget } from './contractTestUtils';

export const shouldSupportDataAttributes = (
  Component: any,
  Wrapper: any = React.Fragment,
  props: any = {},
) => {
  test.sequential('should support data-* attributes', () => {
    const marker = getContractTestMarker('data-attributes');
    const dataTestId = `${marker}-test-id`;

    const { target } = renderWithContractTarget(Component, Wrapper, {
      ...props,
      'data-testid': dataTestId,
      'data-test-id': `${marker}-test-id-legacy`,
      'data-contract-value': 'contract-value',
    }, marker);

    expect(target.getAttribute('data-testid')).toBe(dataTestId);
    expect(target.getAttribute('data-test-id')).toBe(`${marker}-test-id-legacy`);
    expect(target.getAttribute('data-contract-value')).toBe('contract-value');
  });
};
