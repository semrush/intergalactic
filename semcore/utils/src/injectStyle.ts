/* eslint-disable */
// THIS USE BABEL-PLUGIN-CSS-STYLE

let sh = null;
const selectorClass = '_css-style';

function hashCode(str) {
  let hash = 0,
    i,
    chr;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

function injectStyle(css) {
  if (typeof window === 'object') {
    if (!sh) {
      const prevSh = document.querySelector('.' + selectorClass);
      if (prevSh) {
        sh = prevSh;
      } else {
        // @ts-ignore
        const version = preval`
          module.exports = require('../package.json').version
        `;
        sh = document.createElement('style');
        sh.setAttribute('data-ui-v', version);
        sh.classList.add(selectorClass);
        document.head.appendChild(sh);
      }
    }
    const hash = Math.abs(hashCode(css));
    if (!sh.dataset[hash]) {
      sh.dataset[hash] = true;
      sh.insertAdjacentText('beforeend', css);
    }
  }
}

export default injectStyle;
