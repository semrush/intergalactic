import logger from '@semcore/utils/lib/logger';

declare global {
  const preval: (toEval: TemplateStringsArray) => unknown;
}
type Colors = { [colorName: string | symbol]: string };

/*__semcore-vars__:"../style/var.css"*/
const colors = preval`
  const path = require('path');
  module.exports = require('@semcore/babel-plugin-react-semcore').getColorVars(path.resolve(__dirname, '../', 'style/var.css'));
` as Colors;

let componentRenderIndex = 0;
const cache: Colors = {};
const colorReg = /[0-9]/g;
const colorValues = Object.keys(colors)
  .filter((name) => name.match(colorReg))
  .sort((a, b) => {
    return parseInt(a.match(colorReg)!.join(''), 10) - parseInt(b.match(colorReg)!.join(''), 10);
  });

const fallbackColors: Colors = {
  'white-01': 'white',
  'gray-01': 'gray',
  'gray-02': 'gray-blue',
};

const colorsProxy = new Proxy(colors, {
  get: (_obj, prop) => {
    if (typeof prop === 'string' && Object.keys(fallbackColors).includes(prop)) {
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

export const getColor = (key: string) => {
  if (cache[key]) {
    return cache[key];
  }
  const color = colors[colorValues[componentRenderIndex++]];
  cache[key] = color;
  return color;
};
