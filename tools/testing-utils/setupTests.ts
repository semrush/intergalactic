import { expect } from './vitest';
import * as axeMatchers from 'vitest-axe/matchers';
import { toHaveStyle, toHaveFocus } from '@testing-library/jest-dom/matchers';
import { toMatchImageSnapshot } from './toMatchImageSnapshot';
expect.extend({ toMatchImageSnapshot, toHaveStyle, toHaveFocus });
expect.extend(axeMatchers);
class NamedNodeMap {}

(window as any).NamedNodeMap = NamedNodeMap;

(window as any).document.forms ??= [];

(global as any).HTMLElement.prototype.detachEvent = function (type, listener) {
  this.removeEventListener(type.replace('on', ''), listener);
};
