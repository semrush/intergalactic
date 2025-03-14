import React from 'react';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import { cleanup, render, fireEvent, waitFor } from '@semcore/testing-utils/testing-library';

const { shouldSupportClassName, shouldSupportRef } = sharedTests;
import { ScrollArea, eventCalculate } from '../src';

import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('scroll-area Dependency imports', () => {
  runDependencyCheckTests('scroll-area');
});

describe('ScrollArea', () => {
  beforeEach(cleanup);

  test.concurrent('Verify support render function for children', () => {
    const component = (
      <ScrollArea>
        {() => {
          return <ScrollArea.Container />;
        }}
      </ScrollArea>
    );
    render(component);

    expect(
      document.querySelectorAll('[data-ui-name^="ScrollArea"][data-ui-name$="Container"]').length,
    ).toBe(1);
  });

  shouldSupportClassName(ScrollArea);
  shouldSupportRef(ScrollArea);

  test.concurrent('Verify trigger calculate event on container', () => {
    const { getByTestId } = render(
      <ScrollArea>
        <ScrollArea.Container data-testid='container' />
      </ScrollArea>,
    );

    const container = getByTestId('container');
    const eventListener = vi.fn();
    container.addEventListener('calculate', eventListener);

    fireEvent(container, eventCalculate!);

    expect(eventListener).toHaveBeenCalled();
  });

  test.concurrent('Verify correctly set shadows based on scroll position', () => {
    const { getByTestId } = render(
      <ScrollArea shadow>
        <ScrollArea.Container data-testid='test1' w={300} h={300} />
      </ScrollArea>,
    );

    const container = getByTestId('test1');
    Object.defineProperty(container, 'scrollLeft', { value: 10, writable: true });
    Object.defineProperty(container, 'scrollTop', { value: 10, writable: true });
    Object.defineProperty(container, 'scrollWidth', { value: 300, writable: true });
    Object.defineProperty(container, 'clientWidth', { value: 200, writable: true });

    fireEvent.scroll(container);

    waitFor(() => {
      expect(container).toHaveAttribute('data-shadow-horizontal', 'median');
    });
  });

  test.concurrent('Verify keep focused element visible', () => {
    const { getByTestId } = render(
      <ScrollArea>
        <ScrollArea.Container>
          <input data-testid='input' style={{ marginTop: '500px' }} />
        </ScrollArea.Container>
      </ScrollArea>,
    );

    const input = getByTestId('input');
    input.focus();

    expect(document.activeElement).toBe(input);
    expect(input.getBoundingClientRect().top).toBeGreaterThanOrEqual(0);
  });
});

describe('ScrollArea.Container', () => {
  beforeEach(cleanup);

  shouldSupportClassName(ScrollArea.Container, ScrollArea);
  shouldSupportRef(ScrollArea.Container, ScrollArea);
});
