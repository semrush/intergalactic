import { expect, vi } from './vitest';
import * as axeMatchers from 'vitest-axe/matchers';
import {
  toHaveStyle,
  toHaveFocus,
  toHaveAttribute,
  toBeInTheDocument,
} from '@testing-library/jest-dom/matchers';
import { toMatchImageSnapshot } from './toMatchImageSnapshot';
expect.extend({
  toMatchImageSnapshot,
  toHaveStyle,
  toHaveFocus,
  toHaveAttribute,
  toBeInTheDocument,
} as any);
expect.extend(axeMatchers);

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
