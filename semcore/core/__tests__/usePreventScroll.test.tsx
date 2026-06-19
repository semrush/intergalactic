import { cleanup, renderHook } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, afterEach, vi } from '@semcore/testing-utils/vitest';

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

  test.sequential.each(['hidden', 'clip'])(
    'Verify skips locking when body overflow is already %s',
    (overflow) => {
      const spy = vi
        .spyOn(window, 'getComputedStyle')
        .mockReturnValue({ paddingRight: '0px', overflow } as CSSStyleDeclaration);

      const { unmount } = renderHook(() => usePreventScroll(true));

      expect(document.body.style.overflow).toBe('');
      expect(document.body.style.paddingRight).toBe('');
      expect(document.body.style.boxSizing).toBe('');

      unmount();
      spy.mockRestore();
    },
  );

  test.sequential.each(['hidden', 'clip'])(
    'Verify preserves pre-existing inline overflow:%s through skip and unmount',
    (overflow) => {
      document.body.style.overflow = overflow;

      const spy = vi
        .spyOn(window, 'getComputedStyle')
        .mockReturnValue({ paddingRight: '0px', overflow } as CSSStyleDeclaration);

      const { unmount } = renderHook(() => usePreventScroll(true));

      // Nothing should have been changed on mount
      expect(document.body.style.overflow).toBe(overflow);
      expect(document.body.style.paddingRight).toBe('');
      expect(document.body.style.boxSizing).toBe('');

      unmount();
      spy.mockRestore();

      // Pre-existing inline style must remain intact after unmount
      expect(document.body.style.overflow).toBe(overflow);
    },
  );

  test.sequential.each(['scroll', 'auto', 'visible'])(
    'Verify does not skip locking when body overflow is %s',
    (overflow) => {
      const spy = vi
        .spyOn(window, 'getComputedStyle')
        .mockReturnValue({ paddingRight: '0px', overflow } as CSSStyleDeclaration);

      const { unmount } = renderHook(() => usePreventScroll(true));

      // Normal locking should still apply for non-skipped overflow values
      expect(document.body.style.overflow).toBe('hidden');
      expect(document.body.style.boxSizing).toBe('border-box');

      unmount();
      spy.mockRestore();
    },
  );

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
