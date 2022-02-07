import logger from '@semcore/utils/lib/logger'; /* @ts-ignore */
/*__semcore-vars__:"../style/var.css"*/ const colors: { [key: string]: string } = preval`
  const path = require('path');
  module.exports = require('@semcore/babel-plugin-react-semcore/utils/vars')(path.resolve(__dirname, '../', 'style/var.css'));
`;

let componentRenderIndex = 0;
const cache = {};
const colorReg = /[0-9]/g;
const colorValues = Object.keys(colors)
  .filter((name) => name.match(colorReg))
  .sort((a, b) => {
    return parseInt(a.match(colorReg).join(''), 10) - parseInt(b.match(colorReg).join(''), 10);
  });

//Fallback colors
const fallbackColors = {
  'white-01': 'white',
  'gray-01': 'gray',
  'gray-02': 'gray-blue',
};

const colorsProxy = new Proxy(colors, {
  get: (obj, prop: string) => {
    if (Object.keys(fallbackColors).includes(prop)) {
      logger.warn(
        true,
        `'${prop}' property is deprecated, use colors['${fallbackColors[prop]}']`,
        'from package @semcore/chart',
      );
      return fallbackColors[prop];
    }
    return colors[prop];
  },
});

export { colorsProxy as colors };

export function getColor(key: string): string {
  if (cache[key]) {
    return cache[key];
  }
  const color = colors[colorValues[componentRenderIndex++]];
  cache[key] = color;
  return color;
}
