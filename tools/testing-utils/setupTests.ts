import {
  toHaveStyle,
  toHaveFocus,
  toHaveAttribute,
  toBeInTheDocument,
} from '@testing-library/jest-dom/matchers';

import { expect, vi } from './vitest';

expect.extend({
  toHaveStyle,
  toHaveFocus,
  toHaveAttribute,
  toBeInTheDocument,
} as any);

Object.defineProperty(window.SVGElement.prototype, 'getBBox', {
  writable: true,
  value: () => ({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  }),
});

(window as any).matchMedia = vi.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: (e: any) => e('mediaQueryListEvent'),
  removeListener: vi.fn(),
}));
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
(window as any).ResizeObserver = ResizeObserverMock;

class IntersectionObserverMock {
  disconnect() {}
  observe() {}
  takeRecords() {}
  unobserve() {}
}

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

vi.stubGlobal('CSS', {
  supports: (property: string, value?: string) => {
    return false;
  },
});

Object.defineProperty(window.HTMLCanvasElement.prototype, 'getContext', {
  writable: true,
  value: (contextId: string) => {
    if (contextId === '2d') {
      return {
        clearRect: vi.fn(),
        measureText: vi.fn((text: string) => ({ width: text.length * 7 })),
        font: '',
      };
    }
    return null;
  },
});

vi.stubGlobal('requestIdleCallback', vi.fn((callback: IdleRequestCallback) => window.setTimeout(
  () => callback({ didTimeout: false, timeRemaining: () => 0 }),
  1,
)));

vi.stubGlobal('cancelIdleCallback', vi.fn((handle: number) => window.clearTimeout(handle)));
