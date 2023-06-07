import { expect } from './vitest';
import * as axeMatchers from 'vitest-axe/matchers';
import { toHaveStyle, toHaveFocus } from '@testing-library/jest-dom/matchers';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
expect.extend({ toMatchImageSnapshot, toHaveStyle, toHaveFocus });
expect.extend(axeMatchers);
class NamedNodeMap {}
// eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
(window as any).NamedNodeMap = NamedNodeMap;
// eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
(window as any).document.forms ??= [];

(global as any).HTMLElement.prototype.detachEvent = function (type, listener) {
  this.removeEventListener(type.replace('on', ''), listener);
};
