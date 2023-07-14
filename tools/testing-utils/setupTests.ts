import { expect } from './vitest';
import * as axeMatchers from 'vitest-axe/matchers';
import { toHaveStyle, toHaveFocus } from '@testing-library/jest-dom/matchers';
import { toMatchImageSnapshot } from './toMatchImageSnapshot';
expect.extend({ toMatchImageSnapshot, toHaveStyle, toHaveFocus });
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

(window as any).matchMedia = () => ({ matches: false });
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
(window as any).ResizeObserver = ResizeObserverMock;
