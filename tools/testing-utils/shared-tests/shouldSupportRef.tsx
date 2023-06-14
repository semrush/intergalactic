import React from 'react';
import { render } from '../testing-library';
import { test, expect } from '../vitest';

export const shouldSupportRef = (Component, Wrapper = React.Fragment, props = {}) => {
  test.concurrent('ref should return DOM-node', () => {
    const ref = React.createRef();

    render(
      <Wrapper>
        <Component {...props} ref={ref} />
      </Wrapper>,
    );

    expect(ref.current.nodeName).toBeDefined();
  });
};
