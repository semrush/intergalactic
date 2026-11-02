import { render, cleanup } from '@semcore/testing-utils/testing-library';
import { afterEach, describe, expect, test, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import { Collapse } from '../src';

const collapseRoot = (container) => container.firstElementChild;

describe('Collapse', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  test('duration 0 does not read scrollHeight or set an inline height', () => {
    const scrollHeight = vi.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(120);

    const { container, rerender } = render(
      <Collapse visible duration={0} preserveNode>
        <div>open</div>
      </Collapse>,
    );
    const element = collapseRoot(container);

    expect(scrollHeight).not.toHaveBeenCalled();
    expect(element.style.height).toBe('');
    expect(getComputedStyle(element).transitionProperty).toBe('none');
    expect(getComputedStyle(element).height).not.toBe('0px');

    rerender(
      <Collapse visible={false} duration={0} preserveNode>
        <div>closed</div>
      </Collapse>,
    );

    expect(scrollHeight).not.toHaveBeenCalled();
    expect(element.style.height).toBe('');
    expect(getComputedStyle(element).transitionProperty).toBe('none');
    expect(getComputedStyle(element).height).toBe('0px');
  });

  test('a missing duration is instant and a negative duration still sets height', () => {
    const missing = render(
      <Collapse visible preserveNode>
        <div>open</div>
      </Collapse>,
    );
    expect(collapseRoot(missing.container).style.height).toBe('');
    missing.unmount();

    const negative = render(
      <Collapse visible duration={-1} preserveNode>
        <div>open</div>
      </Collapse>,
    );
    expect(collapseRoot(negative.container).style.height).toBe('auto');
  });

  test('a positive duration measures scrollHeight and writes height', () => {
    const scrollHeight = vi.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(120);

    const { container, rerender } = render(
      <Collapse visible duration={200} preserveNode>
        <div>open</div>
      </Collapse>,
    );
    const element = collapseRoot(container);

    expect(scrollHeight).not.toHaveBeenCalled();
    expect(element.style.height).toBe('auto');

    rerender(
      <Collapse visible={false} duration={200} preserveNode>
        <div>closed</div>
      </Collapse>,
    );

    expect(scrollHeight).toHaveBeenCalled();
    expect(element.style.height).toBe('120px');
  });

  test('a zero side of a duration tuple is instant and a positive side still animates', () => {
    const scrollHeight = vi.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(80);

    const { container, rerender } = render(
      <Collapse visible duration={[0, 200]} preserveNode>
        <div>open</div>
      </Collapse>,
    );
    const element = collapseRoot(container);

    expect(element.style.height).toBe('');
    expect(scrollHeight).not.toHaveBeenCalled();

    rerender(
      <Collapse visible={false} duration={[0, 200]} preserveNode>
        <div>closed</div>
      </Collapse>,
    );

    expect(scrollHeight).toHaveBeenCalled();
    expect(element.style.height).toBe('80px');
  });
});
