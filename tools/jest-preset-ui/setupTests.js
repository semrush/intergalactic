const { toMatchImageSnapshot } = require('jest-image-snapshot');
const { toHaveStyle } = require('@testing-library/jest-dom/matchers');

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
