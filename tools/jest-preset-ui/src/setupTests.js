const { configureToMatchImageSnapshot } = require('jest-image-snapshot');
const { toHaveStyle } = require('@testing-library/jest-dom/matchers');
const { toHaveNoViolations } = require('jest-axe');

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  comparisonMethod: 'ssim',
  customDiffConfig: {
    ssim: 'fast',
  },
  failureThreshold: 0,
  failureThresholdType: 'percent',
});

expect.extend(toHaveNoViolations);
expect.extend({ toMatchImageSnapshot, toHaveStyle });

// fake method because use popper.js
if (global.document) {
  document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document,
    },
  });
}

if (global.window) {
  const { getComputedStyle } = global.window;
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
  window.HTMLElement.prototype.scrollIntoView = jest.fn;
  window.getComputedStyle = (elt) => getComputedStyle(elt);
}

jest.setTimeout(10000);
