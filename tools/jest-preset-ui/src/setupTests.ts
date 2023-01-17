// const { configureToMatchImageSnapshot } = require('jest-image-snapshot');
// const { toHaveStyle } = require('@testing-library/jest-dom/matchers');
// const { toHaveNoViolations } = require('jest-axe');

import { vi } from 'vitest';

// const toMatchImageSnapshot = configureToMatchImageSnapshot({
//   comparisonMethod: 'ssim',
//   customDiffConfig: {
//     ssim: 'fast',
//   },
//   failureThreshold: 0,
//   failureThresholdType: 'percent',
// });

// expect.extend(toHaveNoViolations);
// expect.extend({ toMatchImageSnapshot, toHaveStyle });

// fake method because use popper.js
export const setupTests = () => {
  // if (global.document) {
  //   document.createRange = () => ({
  //     setStart: () => {},
  //     setEnd: () => {},
  //     commonAncestorContainer: {
  //       nodeName: 'BODY',
  //       ownerDocument: document,
  //     },
  //   });
  // }
  // if (global.window) {
  //   const { getComputedStyle } = global.window;
  //   window.matchMedia = vi.fn().mockImplementation((query) => ({
  //     matches: false,
  //     media: query,
  //     onchange: null,
  //     addListener: vi.fn(), // Deprecated
  //     removeListener: vi.fn(), // Deprecated
  //     addEventListener: vi.fn(),
  //     removeEventListener: vi.fn(),
  //     dispatchEvent: vi.fn(),
  //   }));
  //   window.HTMLElement.prototype.scrollIntoView = vi.fn;
  //   window.getComputedStyle = (elt) => getComputedStyle(elt);
  // }
};
