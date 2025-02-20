import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import {
  cleanup,
  render,
  fireEvent,
  waitFor,
  act,
  getAllByTestId,
} from '@semcore/testing-utils/testing-library';

import { eventCalculate } from '../src/ScrollArea.jsx';

const { shouldSupportClassName, shouldSupportRef } = sharedTests;
import ScrollArea from '../src';

describe('ScrollArea', () => {
  beforeEach(cleanup);

  shouldSupportClassName(ScrollArea);
  shouldSupportRef(ScrollArea);

  test.sequential('Verify support render function for children', () => {
    const component = <ScrollArea>{() => <ScrollArea.Container />}</ScrollArea>;
    render(component);

    expect(
      document.querySelectorAll('[data-ui-name^="ScrollArea"][data-ui-name$="Container"]').length,
    ).toBe(1);
  });

  test.skip('Verify support area attributes to bar', () => {
    const { queryByTestId } = render(
      <ScrollArea h={200} w={200} shadow>
        {[...new Array(10)].map((_, i) => (
          <div key={i} style={{ width: '100px', height: '100px' }} />
        ))}
        <ScrollArea.Bar orientation='vertical' data-testid='bar' />
      </ScrollArea>,
    );
    expect((queryByTestId('bar')?.attributes as any)['aria-valuemin']).toBeTruthy();
    expect((queryByTestId('bar')?.attributes as any)['aria-valuenow']).toBeTruthy();
    expect((queryByTestId('bar')?.attributes as any)['aria-valuemax']).toBeTruthy();
  });

  test.skip('Verify support shadow display on container', async ({ task }) => {
    const component = (
      <ScrollArea h={200} w={200} shadow>
        {[...new Array(3)].map((_, ind) => (
          <div key={`parent-${ind}`} style={{ display: 'flex', width: '300px' }}>
            {[...new Array(3)].map((_, ind) => (
              <div key={ind} style={{ width: '100px', height: '100px' }} />
            ))}
          </div>
        ))}
      </ScrollArea>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test('Verify trigger calculate event on container', () => {
    const { getByTestId } = render(
      <ScrollArea>
        <ScrollArea.Container data-testid='container' />
      </ScrollArea>,
    );

    const container = getByTestId('container');
    const eventListener = vi.fn();
    container.addEventListener('calculate', eventListener);

    fireEvent(container, eventCalculate);

    expect(eventListener).toHaveBeenCalled();
  });

  test('Verify correctly set shadows based on scroll position', () => {
    const { getByTestId } = render(
      <ScrollArea shadow>
        <ScrollArea.Container data-testid='test1' w={300} h={300}/>
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

  test('Verify keep focused element visible', () => {
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
