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

const canvasContextMock = {
  clearRect: vi.fn(),
  measureText: vi.fn((text: string) => ({ width: text.length * 7 })),
  font: '',
};

Object.defineProperty(window.HTMLCanvasElement.prototype, 'getContext', {
  writable: true,
  value: vi.fn((contextId: string) => {
    if (contextId === '2d') return canvasContextMock;
    return null;
  }),
});

(window as any).matchMedia = vi.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: (e: any) => e('mediaQueryListEvent'),
  removeListener: vi.fn(),
}));

vi.stubGlobal('requestIdleCallback', (callback: any) => window.setTimeout(
  () => callback({ didTimeout: false, timeRemaining: () => 0 }),
  1,
));
vi.stubGlobal('cancelIdleCallback', (handle: number) => window.clearTimeout(handle));

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
