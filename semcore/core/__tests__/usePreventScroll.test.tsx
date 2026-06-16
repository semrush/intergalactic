import { cleanup, renderHook } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, afterEach, vi } from '@semcore/testing-utils/vitest';
import type React from 'react';

import usePreventScroll from '../src/utils/use/usePreventScroll';

const emptyRef: React.RefObject<HTMLElement> = { current: null };

function clearBodyStyles() {
  // jsdom quirk: style.paddingRight = '' does NOT remove the property.
  // Must use removeProperty() instead.
  document.body.style.removeProperty('overflow');
  document.body.style.removeProperty('padding-right');
  document.body.style.removeProperty('box-sizing');
  document.documentElement.style.removeProperty('scrollbar-gutter');
  document.documentElement.style.removeProperty('background-color');
}

describe('usePreventScroll', () => {
  beforeEach(() => {
    cleanup();
    clearBodyStyles();
  });

  afterEach(() => {
    cleanup();
    clearBodyStyles();
  });

  test.sequential('Verify does not set overflow hidden when not visible', () => {
    const { unmount } = renderHook(() => usePreventScroll(emptyRef, false));
    expect(document.body.style.overflow).not.toBe('hidden');
    unmount();
  });

  test.sequential('Verify does not set overflow hidden when disabled', () => {
    const { unmount } = renderHook(() => usePreventScroll(emptyRef, true, true));
    expect(document.body.style.overflow).not.toBe('hidden');
    unmount();
  });

  test.sequential('Verify does not touch styles when body overflow is already hidden', () => {
    document.body.style.overflow = 'hidden';

    const { unmount } = renderHook(() => usePreventScroll(emptyRef, true));

    expect(document.body.style.overflow).toBe('hidden');
    expect(document.body.style.boxSizing).toBe('');
    expect(document.body.style.paddingRight).toBe('');

    unmount();

    expect(document.body.style.overflow).toBe('hidden');
  });

  test.sequential('Verify preserves pre-existing inline styles after unmount', () => {
    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = '10px';
    document.body.style.boxSizing = 'content-box';

    const { unmount } = renderHook(() => usePreventScroll(emptyRef, true));
    expect(document.body.style.overflow).toBe('hidden');
    expect(document.body.style.boxSizing).toBe('border-box');

    unmount();

    expect(document.body.style.overflow).toBe('auto');
    expect(document.body.style.paddingRight).toBe('10px');
    expect(document.body.style.boxSizing).toBe('content-box');
  });

  test.sequential('Verify multiple preventers: body stays locked until all unmount', () => {
    const hook1 = renderHook(() => usePreventScroll(emptyRef, true));
    const hook2 = renderHook(() => usePreventScroll(emptyRef, true));

    expect(document.body.style.overflow).toBe('hidden');

    hook2.unmount();
    expect(document.body.style.overflow).toBe('hidden');

    hook1.unmount();
    expect(document.body.style.overflow).toBe('');
  });

  test.sequential('Verify reacts to visible changing from true to false', () => {
    const { rerender, unmount } = renderHook(({ visible }) => usePreventScroll(emptyRef, visible), {
      initialProps: { visible: true },
    });

    expect(document.body.style.overflow).toBe('hidden');

    rerender({ visible: false });

    expect(document.body.style.overflow).toBe('');
    unmount();
  });

  test.sequential(
    'Verify uses scrollbar-gutter instead of padding when supported and html tag is scrollable',
    () => {
      const forElement: React.RefObject<HTMLElement> = { current: document.createElement('div') };
      forElement.current!.style.backgroundColor = 'rgb(255, 0, 0)';

      const cssSupports = vi.spyOn(CSS, 'supports').mockReturnValue(true);
      Object.defineProperty(document.documentElement, 'scrollHeight', {
        configurable: true,
        get: () => 2000,
      });
      Object.defineProperty(document.documentElement, 'clientHeight', {
        configurable: true,
        get: () => 800,
      });

      const { unmount } = renderHook(() => usePreventScroll(forElement, true));

      expect(document.body.style.overflow).toBe('hidden');
      expect(document.documentElement.style.scrollbarGutter).toBe('stable');
      expect(document.documentElement.style.backgroundColor).toBe('rgb(255, 0, 0)');
      expect(document.body.style.boxSizing).toBe('');
      expect(document.body.style.paddingRight).toBe('');

      unmount();

      expect(document.body.style.overflow).toBe('');
      expect(document.documentElement.style.scrollbarGutter).toBe('');
      expect(document.documentElement.style.backgroundColor).toBe('');

      cssSupports.mockRestore();
      // @ts-expect-error restore jsdom's prototype getters
      delete document.documentElement.scrollHeight;
      // @ts-expect-error restore jsdom's prototype getters
      delete document.documentElement.clientHeight;
    },
  );
});
