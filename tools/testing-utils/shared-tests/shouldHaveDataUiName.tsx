import React from 'react';

import { cleanup, render } from '../testing-library';
import { test, expect } from '../vitest';

type ShouldHaveDataUiNameOptions = {
  Component: any;
  Wrapper?: any;
  props?: any;
  expectedDataUiName: string;
};

const renderWithDataUiNameTarget = (
  Component: any,
  Wrapper: any = React.Fragment,
  props: any = {},
): Element => {
  cleanup();

  const targetMarker = 'semcore-data-ui-name-target';
  const { children, ...restProps } = props;
  const result = render(
    <Wrapper>
      <Component {...restProps} data-contract-target={targetMarker}>
        {children}
      </Component>
    </Wrapper>,
  );
  const target = result.baseElement.querySelector(`[data-contract-target="${targetMarker}"]`);

  if (!target) {
    throw new Error(`Unable to find data-ui-name test target by data-contract-target="${targetMarker}"`);
  }

  return target;
};

export const shouldHaveDataUiName = ({
  Component,
  Wrapper,
  props,
  expectedDataUiName,
}: ShouldHaveDataUiNameOptions) => {
  test.sequential(`should have data-ui-name="${expectedDataUiName}"`, () => {
    const target = renderWithDataUiNameTarget(Component, Wrapper, props);

    expect(target.getAttribute('data-ui-name')).toBe(expectedDataUiName);
  });
};
