/*__semcore-vars__:"../style/var.css"*/ /* @ts-ignore */
const colors = preval`
  const path = require('path');
  module.exports = require('@semcore/babel-plugin-react-semcore/utils/vars')(path.resolve(__dirname, '../', 'style/var.css'));
`;

let componentRenderIndex = 0;
const cache = {};
const colorValues = Object.keys(colors)
  // @ts-ignore
  .filter((name) => !name.includes(['gray-01', 'gray-02', 'white-01']))
  .sort((a, b) => {
    return parseInt(a.match(/[0-9]/g).join(''), 10) - parseInt(b.match(/[0-9]/g).join(''), 10);
  });

export { colors };
export function getColor(key: string): string {
  if (cache[key]) {
    return cache[key];
  }
  const color = colors[colorValues[componentRenderIndex++]];
  cache[key] = color;
  return color;
}
