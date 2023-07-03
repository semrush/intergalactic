import React from 'react';
import { render } from '../testing-library';
import { test, expect } from '../vitest';

export const shouldSupportRef = (
  Component: any,
  Wrapper: any = React.Fragment,
  props: any = {},
) => {
  test.concurrent('ref should return DOM-node', () => {
    const ref = React.createRef<HTMLElement>();

    render(
      <Wrapper>
        <Component {...props} ref={ref} />
      </Wrapper>,
    );

    expect(ref.current?.nodeName).toBeDefined();
  });
};
