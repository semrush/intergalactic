import React from 'react';

import { cleanup, render } from '../testing-library';
import { test, expect } from '../vitest';

export const shouldSupportRef = (
  Component: any,
  Wrapper: any = React.Fragment,
  props: any = {},
) => {
  test.sequential('ref should return DOM-node', () => {
    cleanup();

    const ref = React.createRef<HTMLElement>();

    render(
      <Wrapper>
        <Component {...props} ref={ref} />
      </Wrapper>,
    );

    expect(ref.current?.nodeName).toBeDefined();
  });
};
