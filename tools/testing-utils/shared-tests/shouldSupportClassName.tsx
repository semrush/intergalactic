import React from 'react';
import { render } from '../testing-library';
import { test, expect } from '../vitest';

export const shouldSupportClassName = (
  Component: any,
  Wrapper: any = React.Fragment,
  props: any = {},
) => {
  test.sequential('should support className extending', () => {
    const className = 'more-then one-class';

    const { getByTestId } = render(
      <Wrapper>
        <Component data-testid='component' {...props} className={className} />
      </Wrapper>,
    );

    expect(getByTestId('component').attributes.getNamedItem('class')?.value).toContain(className);
  });
};
