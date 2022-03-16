import React from 'react';
import { render } from '@testing-library/react';

export function shouldSupportRef(Component, WrapperComponent) {
  test('ref should return DOM-node', () => {
    const ref = React.createRef();
    const Wrapper = WrapperComponent || React.Fragment;

    render(
      <Wrapper>
        <Component ref={ref} />
      </Wrapper>,
    );

    expect(ref.current.nodeName).toBeDefined();
  });
}
