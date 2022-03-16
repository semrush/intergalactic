import React from 'react';
import { render } from '@testing-library/react';

export function shouldSupportClassName(Component, WrapperComponent) {
  test('should support className extending', () => {
    const className = 'more-then one-class';
    const Wrapper = WrapperComponent || React.Fragment;

    const { getByTestId } = render(
      <Wrapper>
        <Component data-testid="component" className={className} />
      </Wrapper>,
    );

    expect(getByTestId('component').attributes.class.value).toContain(className);
  });
}
