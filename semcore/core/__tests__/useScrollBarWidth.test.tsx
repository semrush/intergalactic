import { act, cleanup, renderHook } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, afterEach, vi } from '@semcore/testing-utils/vitest';

/**
 * `useScrollBarWidth` keeps its store (measured sizes, listeners, the `inited` flag and the
 * `ResizeObserver`) in module scope, shared by every consumer. Each test re-imports the module
 * through `loadHook()` so that state never leaks between cases.
 */
const loadHook = async () => {
  vi.resetModules();
  const module = await import('../src/utils/use/useScrollBarWidth');

  return module.useScrollBarWidth;
};

// jsdom performs no layout, so both the viewport and the layout box are faked.
// `window.innerWidth - document.documentElement.clientWidth` is what the hook measures.
const viewport = { innerWidth: 1024, innerHeight: 768, clientWidth: 1024, clientHeight: 768 };

const setViewport = (next: Partial<typeof viewport>) => {
  Object.assign(viewport, next);
};

type ObserverEntry = { callback: () => void; targets: Element[]; disconnected: boolean };

let observers: ObserverEntry[] = [];

class ControllableResizeObserver {
  private entry: ObserverEntry;

  constructor(callback: () => void) {
    this.entry = { callback, targets: [], disconnected: false };
    observers.push(this.entry);
  }

  observe(target: Element) {
    this.entry.targets.push(target);
  }

  unobserve() {}

  disconnect() {
    this.entry.disconnected = true;
  }
}

/** Emulates the browser notifying about a `document.documentElement` resize. */
const triggerResizeObserver = () => {
  observers.filter(({ disconnected }) => !disconnected).forEach(({ callback }) => callback());
};

/** `measure()` runs inside `requestAnimationFrame`, so pending frames have to be flushed. */
const flushFrame = async () => {
  await act(async () => {
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => resolve());
    });
  });
};

describe('useScrollBarWidth', () => {
  let originalInnerWidth: PropertyDescriptor | undefined;
  let originalInnerHeight: PropertyDescriptor | undefined;

  beforeEach(() => {
    cleanup();

    observers = [];
    setViewport({ innerWidth: 1024, innerHeight: 768, clientWidth: 1024, clientHeight: 768 });

    originalInnerWidth = Object.getOwnPropertyDescriptor(window, 'innerWidth');
    originalInnerHeight = Object.getOwnPropertyDescriptor(window, 'innerHeight');

    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      get: () => viewport.innerWidth,
    });
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      get: () => viewport.innerHeight,
    });
    Object.defineProperty(document.documentElement, 'clientWidth', {
      configurable: true,
      get: () => viewport.clientWidth,
    });
    Object.defineProperty(document.documentElement, 'clientHeight', {
      configurable: true,
      get: () => viewport.clientHeight,
    });

    vi.stubGlobal('ResizeObserver', ControllableResizeObserver);
  });

  afterEach(() => {
    cleanup();

    vi.unstubAllGlobals();
    vi.restoreAllMocks();

    if (originalInnerWidth) Object.defineProperty(window, 'innerWidth', originalInnerWidth);
    if (originalInnerHeight) Object.defineProperty(window, 'innerHeight', originalInnerHeight);

    delete (document.documentElement as any).clientWidth;
    delete (document.documentElement as any).clientHeight;
  });

  test('Verify measures horizontal scroll bar height when vertical is false', async () => {
    setViewport({ clientWidth: 1007, clientHeight: 753 });

    const useScrollBarWidth = await loadHook();

    const { result: vertical, unmount: unmountVertical } = renderHook(() => useScrollBarWidth(true));
    const { result: horizontal, unmount: unmountHorizontal } = renderHook(() =>
      useScrollBarWidth(false),
    );

    expect(vertical.current).toBe(17);
    expect(horizontal.current).toBe(15);

    unmountVertical();
    unmountHorizontal();
  });

  test('Verify picks up a scroll bar that appears after mount (UIK-5995)', async () => {
    const useScrollBarWidth = await loadHook();

    const { result, unmount } = renderHook(() => useScrollBarWidth());

    expect(result.current).toBe(0);

    // Content grew and the browser laid out a scroll bar — no window resize happened.
    setViewport({ clientWidth: 1007 });
    triggerResizeObserver();
    await flushFrame();

    expect(result.current).toBe(17);
    unmount();
  });

  test('Verify observes document.documentElement', async () => {
    const useScrollBarWidth = await loadHook();

    const { unmount } = renderHook(() => useScrollBarWidth());

    expect(observers).toHaveLength(1);
    expect(observers[0].targets).toEqual([document.documentElement]);

    unmount();
  });

  test('Verify updates every consumer of the shared store', async () => {
    const useScrollBarWidth = await loadHook();

    const first = renderHook(() => useScrollBarWidth());
    const second = renderHook(() => useScrollBarWidth());

    setViewport({ clientWidth: 1007 });
    triggerResizeObserver();
    await flushFrame();

    expect(first.result.current).toBe(17);
    expect(second.result.current).toBe(17);

    first.unmount();
    second.unmount();
  });

  test('Verify keeps listening while at least one consumer is mounted', async () => {
    const removeEventListener = vi.spyOn(window, 'removeEventListener');

    const useScrollBarWidth = await loadHook();

    const first = renderHook(() => useScrollBarWidth());
    const second = renderHook(() => useScrollBarWidth());

    first.unmount();

    expect(removeEventListener).not.toHaveBeenCalledWith('resize', expect.any(Function));
    expect(observers[0].disconnected).toBe(false);

    // The still mounted consumer must keep receiving updates.
    setViewport({ clientWidth: 1007 });
    triggerResizeObserver();
    await flushFrame();

    expect(second.result.current).toBe(17);

    second.unmount();
  });

  test('Verify tears down listeners and observer when the last consumer unmounts', async () => {
    const removeEventListener = vi.spyOn(window, 'removeEventListener');

    const useScrollBarWidth = await loadHook();

    const { unmount } = renderHook(() => useScrollBarWidth());

    unmount();

    expect(removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
    expect(observers[0].disconnected).toBe(true);
  });

  test('Verify cancels a pending frame on teardown', async () => {
    const cancelAnimationFrame = vi.spyOn(window, 'cancelAnimationFrame');

    const useScrollBarWidth = await loadHook();

    const { unmount } = renderHook(() => useScrollBarWidth());

    // Schedules a frame that must not survive the teardown.
    window.dispatchEvent(new Event('resize'));
    unmount();

    expect(cancelAnimationFrame).toHaveBeenCalled();
  });

  test('Verify measures once per frame for a burst of resize notifications', async () => {
    const requestAnimationFrame = vi.spyOn(window, 'requestAnimationFrame');

    const useScrollBarWidth = await loadHook();

    const { result, unmount } = renderHook(() => useScrollBarWidth());

    setViewport({ clientWidth: 1007 });
    window.dispatchEvent(new Event('resize'));
    triggerResizeObserver();
    triggerResizeObserver();

    expect(requestAnimationFrame).toHaveBeenCalledTimes(1);

    await flushFrame();

    expect(result.current).toBe(17);
    unmount();
  });

  test('Verify re-initializes after every consumer unmounted, even with a pending frame', async () => {
    const useScrollBarWidth = await loadHook();

    const firstMount = renderHook(() => useScrollBarWidth());

    // A frame still pending at teardown must not block the next subscription.
    window.dispatchEvent(new Event('resize'));
    firstMount.unmount();

    setViewport({ clientWidth: 1007 });

    const { result, unmount } = renderHook(() => useScrollBarWidth());

    // A fresh `init()` must run and re-measure instead of being short-circuited by `inited`.
    expect(result.current).toBe(17);
    expect(observers).toHaveLength(2);
    expect(observers[1].disconnected).toBe(false);

    // The re-attached listeners must still be live.
    setViewport({ clientWidth: 1014 });
    triggerResizeObserver();
    await flushFrame();

    expect(result.current).toBe(10);
    unmount();
  });

  test('Verify works without ResizeObserver support', async () => {
    vi.stubGlobal('ResizeObserver', undefined);

    const useScrollBarWidth = await loadHook();

    setViewport({ clientWidth: 1007 });

    const { result, unmount } = renderHook(() => useScrollBarWidth());

    expect(result.current).toBe(17);

    // The resize listener stays the only update source and must keep working.
    setViewport({ innerWidth: 800, clientWidth: 790 });

    await act(async () => {
      window.dispatchEvent(new Event('resize'));
    });
    await flushFrame();

    expect(result.current).toBe(10);

    expect(() => unmount()).not.toThrow();
  });

  test('Verify does not touch the DOM when it is not available (SSR)', async () => {
    vi.doMock('../src/utils/canUseDOM', () => ({ default: () => false }));

    const addEventListener = vi.spyOn(window, 'addEventListener');

    vi.resetModules();
    const { useScrollBarWidth } = await import('../src/utils/use/useScrollBarWidth');

    setViewport({ clientWidth: 1007 });

    const { result, unmount } = renderHook(() => useScrollBarWidth());

    expect(result.current).toBe(0);
    expect(addEventListener).not.toHaveBeenCalledWith('resize', expect.any(Function));
    expect(observers).toHaveLength(0);

    expect(() => unmount()).not.toThrow();

    vi.doUnmock('../src/utils/canUseDOM');
  });
});
