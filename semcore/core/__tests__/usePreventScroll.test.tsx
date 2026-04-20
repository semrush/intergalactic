import { cleanup, renderHook } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, afterEach } from '@semcore/testing-utils/vitest';

import usePreventScroll from '../src/utils/use/usePreventScroll';

function clearBodyStyles() {
  // jsdom quirk: style.paddingRight = '' does NOT remove the property.
  // Must use removeProperty() instead.
  document.body.style.removeProperty('overflow');
  document.body.style.removeProperty('padding-right');
  document.body.style.removeProperty('box-sizing');
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
    const { unmount } = renderHook(() => usePreventScroll(false));
    expect(document.body.style.overflow).not.toBe('hidden');
    unmount();
  });

  test.sequential('Verify does not set overflow hidden when disabled', () => {
    const { unmount } = renderHook(() => usePreventScroll(true, true));
    expect(document.body.style.overflow).not.toBe('hidden');
    unmount();
  });

  test.sequential('Verify preserves pre-existing inline styles after unmount', () => {
    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = '10px';
    document.body.style.boxSizing = 'content-box';

    const { unmount } = renderHook(() => usePreventScroll(true));
    expect(document.body.style.overflow).toBe('hidden');
    expect(document.body.style.boxSizing).toBe('border-box');

    unmount();

    expect(document.body.style.overflow).toBe('auto');
    expect(document.body.style.paddingRight).toBe('10px');
    expect(document.body.style.boxSizing).toBe('content-box');
  });

  test.sequential('Verify multiple preventers: body stays locked until all unmount', () => {
    const hook1 = renderHook(() => usePreventScroll(true));
    const hook2 = renderHook(() => usePreventScroll(true));

    expect(document.body.style.overflow).toBe('hidden');

    hook1.unmount();
    expect(document.body.style.overflow).toBe('hidden');

    hook2.unmount();
    expect(document.body.style.overflow).toBe('');
  });

  test.sequential('Verify reacts to visible changing from true to false', () => {
    const { rerender, unmount } = renderHook(({ visible }) => usePreventScroll(visible), {
      initialProps: { visible: true },
    });

    expect(document.body.style.overflow).toBe('hidden');

    rerender({ visible: false });

    expect(document.body.style.overflow).toBe('');
    unmount();
  });
});
