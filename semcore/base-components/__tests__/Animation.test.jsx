import { afterEach, expect, test, describe, vi } from '@semcore/testing-utils/vitest';
import React from 'react';
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';

import { Animation } from '../src';

let root = null;
let container = null;

const renderSync = (element) => {
  container = document.createElement('div');
  root = createRoot(container);

  document.body.appendChild(container);

  flushSync(() => {
    root.render(element);
  });

  return container;
};

describe('Animation', () => {
  afterEach(() => {
    if (root && container) {
      flushSync(() => {
        root.unmount();
      });
      container.remove();
      root = null;
      container = null;
    }

    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  test('Verify not renders when visible is false and preserveNode is false', () => {
    const container = renderSync(
      <Animation visible={false} preserveNode={false}>
        Content
      </Animation>,
    );
    expect(container.textContent).not.toContain('Content');
  });

  test('Verify preserve node when preserveNode is true', () => {
    const container = renderSync(
      <Animation visible={false} preserveNode={true}>
        Content
      </Animation>,
    );
    expect(container.textContent).toContain('Content');
  });

  test('Verify animationsDisabled fallback uses zero timeout', () => {
    vi.useFakeTimers();
    const setTimeoutSpy = vi.spyOn(globalThis, 'setTimeout');
    setTimeoutSpy.mockClear();

    renderSync(
      <Animation visible={false} preserveNode animationsDisabled>
        Content
      </Animation>,
    );

    expect(setTimeoutSpy).toHaveBeenCalled();
    const calls = setTimeoutSpy.mock.calls;
    expect(calls[calls.length - 1][1]).toBe(0);
  });

  test('Verify fallback timeout uses exit duration and delay', () => {
    vi.useFakeTimers();
    const setTimeoutSpy = vi.spyOn(globalThis, 'setTimeout');
    setTimeoutSpy.mockClear();

    renderSync(
      <Animation visible={false} preserveNode duration={[300, 200]} delay={[0, 50]}>
        Content
      </Animation>,
    );

    expect(setTimeoutSpy).toHaveBeenCalled();
    const calls = setTimeoutSpy.mock.calls;
    expect(calls[calls.length - 1][1]).toBe(350);
  });
});
