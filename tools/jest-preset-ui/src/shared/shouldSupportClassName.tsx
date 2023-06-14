import React from 'react';
import { render } from '@testing-library/react';
import { test, expect } from 'vitest';

export const shouldSupportClassName = (Component, Wrapper = React.Fragment, props = {}) => {
  test('should support className extending', () => {
    const className = 'more-then one-class';

    const { getByTestId } = render(
      <Wrapper>
        <Component data-testid="component" {...props} className={className} />
      </Wrapper>,
    );

    expect(getByTestId('component').attributes.class.value).toContain(className);
  });
};
