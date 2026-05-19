import React from 'react';

import { cleanup, render } from '../testing-library';

let contractTestId = 0;

export const getContractTestMarker = (name: string) => `semcore-contract-${name}-${contractTestId++}`;

export const renderWithContractTarget = (
  Component: any,
  Wrapper: any = React.Fragment,
  props: any = {},
  marker = getContractTestMarker('target'),
  children?: React.ReactNode,
): { container: HTMLElement; target: Element } => {
  cleanup();

  const { children: propsChildren, ...restProps } = props;
  const targetChildren = children ?? propsChildren;
  const result = render(
    <Wrapper>
      <Component {...restProps} data-contract-target={marker}>
        {targetChildren}
      </Component>
    </Wrapper>,
  );
  const target = result.baseElement.querySelector(`[data-contract-target="${marker}"]`);

  if (!target) {
    throw new Error(`Unable to find contract test target by data-contract-target="${marker}"`);
  }

  return { ...result, target };
};
