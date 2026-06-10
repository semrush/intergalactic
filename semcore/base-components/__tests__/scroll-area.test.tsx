import { act, cleanup, render, waitFor } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import { ScrollArea, eventCalculate } from '../src';

describe('ScrollArea', () => {
  beforeEach(cleanup);

  test.sequential('Verify support render function for children', () => {
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

  test.sequential('Verify trigger calculate event on container', () => {
    const { getByTestId } = render(
      <ScrollArea>
        <ScrollArea.Container data-testid='container' />
      </ScrollArea>,
    );

    const container = getByTestId('container');
    const eventListener = vi.fn();
    container.addEventListener('calculate', eventListener);

    container.dispatchEvent(eventCalculate!);

    expect(eventListener).toHaveBeenCalled();
  });

  test.sequential('Verify correctly set shadows based on scroll position', async () => {
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

    await act(async () => {
      container.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => {
      const scrollArea = container.closest('[data-ui-name="ScrollArea"]');
      const horizontalShadow = scrollArea?.querySelector('[class*="SShadowHorizontal"]');

      expect(horizontalShadow).toBeInstanceOf(HTMLElement);
      expect((horizontalShadow as HTMLElement).className).toContain('_position_median_');
    });
  });

  test.sequential('Verify keep focused element visible', () => {
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
